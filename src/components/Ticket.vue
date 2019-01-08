<template>
  <b-card-group deck>
    <b-card
      :header="author"
      header-tag="header"
      :footer="date.date | format"
      footer-tag="footer"
      :title="title"
    >
      <p class="card-text"></p>
      <b-button variant="primary" @click="seeTicket">See</b-button>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: "Ticket",
  props: {
    title: String,
    author: String,
    date: Object,
    status: String
  },
  methods: {
    seeTicket() {
      this.$router.push("Login");
    }
  },
  filters: {
    format(date) {
      let formatted = new Date(date).toLocaleDateString("en-EN", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      });
      return formatted;
    }
  }
};
</script>