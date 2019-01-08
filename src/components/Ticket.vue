<template>
  <b-card
    :header="author"
    header-tag="header"
    :footer="date.date | format"
    footer-tag="footer"
    :title="title"
  >
    <p class="card-text"></p>
    <b-button variant="primary" @click="seeTicket(id)">See</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'Ticket',
  props: {
    id: Number,
    title: String,
    author: String,
    date: Object,
    status: String,
  },
  methods: {
    seeTicket(id) {
      this.$router.push(`tickets/${id}`);
    },
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
