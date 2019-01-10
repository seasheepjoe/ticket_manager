<template>
  <b-card
    :header="author"
    header-tag="header"
    :footer="date.date | format"
    footer-tag="footer"
    :title="title"
  >
    <p class="card-text"></p>
    <b-button variant="primary" @click="showTicket(id)">See</b-button>
    <span @click="deleteTicket">&times;</span>
  </b-card>
</template>

<script>
import api from "../config/ApiConfig";

export default {
  name: 'Ticket',
  props: {
    id: Number,
    title: String,
    author: String,
    date: Object,
    status: String,
    onTicketDeleted: Function
  },
  methods: {
    showTicket(id) {
      this.$router.push(`tickets/${id}`);
    },
    deleteTicket() {
      const { id } = this;
      const that = this;
      api
        .delete(`http://api.ticketmanager.com/tickets/remove/${id}`)
        .then(response => {
          const { data } = response;
          switch (data.status) {
            case "success":
              that.onTicketDeleted(id);
              break;
            case "error":
              that.$data.error = true;
              that.$data.error_message = that.$i18n.t(data.message);
              break;
            default:
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  filters: {
    format(date) {
      const formatted = new Date(date).toLocaleDateString('en-EN', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
      return formatted;
    },
  },
};
</script>

<style scoped>
span:hover {
  color: red;
  transition: all 0.2s;
  cursor: pointer;
}

span {
  position: absolute;
  font-size: 50px;
  right: 2.5%;
  top: 17.5%;
}
</style>
