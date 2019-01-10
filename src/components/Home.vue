<template>
  <div id="app">
    <b-container>
      <h3 v-if="tickets.length === 0">No tickets.</h3>
      <b-card-group deck class="ticket-list">
        <Ticket
          :key="index" v-for="(item, index) in tickets"
          :title="item.title"
          :author="item.author.fullname"
          :messages="item.messages"
          :date="item.created_at"
          :status="item.status"
          :id="item.id"
          :on-ticket-deleted="deleteTicket"
        />
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import api from "../config/ApiConfig";
import Ticket from "./Ticket.vue";

export default {
  mounted() {
    if (this.$store.state.API_TOKEN) this.getTickets();
  },
  name: "Home",
  components: {
    Ticket
  },
  data() {
    return {
      tickets: []
    };
  },
  methods: {
    getTickets() {
      const that = this;
      api
        .get("http://api.ticketmanager.com/tickets")
        .then(response => {
          const { data } = response;
          switch (data.status) {
            case "success":
              that.$data.tickets = data.tickets;
              break;
            case "error":
              break;
            default:
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteTicket(id) {
      let data = this.tickets;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          data.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>

<style>
.ticket-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
