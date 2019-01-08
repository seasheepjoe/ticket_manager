<template>
  <div id="app">
    <h2>Home</h2>
    <ul :key="index" v-for="(item, index) in tickets">
      <li>
        {{ item.title }}
        <a>{{ item.author.fullname }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../config/ApiConfig";

export default {
  mounted() {
    this.$store.state.API_TOKEN !== null ? this.getTickets() : null;
  },
  name: "Home",
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
          console.log(data);
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
</style>
