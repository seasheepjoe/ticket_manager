<template>
  <div id="app">
    <h2>Home</h2>
    <b-container>
      <b-card-group deck class="ticket-list" :key="index" v-for="(item, index) in tickets">
        <Ticket
          :title="item.title"
          :author="item.author.fullname"
          :messages="item.messages"
          :date="item.created_at"
          :status="item.status"
          :id="item.id"
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
    this.$store.state.API_TOKEN !== null ? this.getTickets() : null;
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
      let that = this;
      api
        .get("http://api.ticketmanager.com/tickets")
        .then(function(response) {
          let data = response.data;
          switch (data.status) {
            case "success":
              that.$data.tickets = data.tickets;
            case "error":
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.ticket-list {
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
