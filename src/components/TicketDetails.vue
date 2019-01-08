<template>
  <b-container>
    <div class="ticket">
      <div class="contributors" :key="index" v-for="(item, index) in ticket.contributors">
        <Contributor :fullname="item.fullname" :ticketId="ticket.id" :contributorId="item.id"/>
      </div>
    </div>
    <div class="messages-list" :key="index" v-for="(item, index) in messages">
      <Message :content="item.content" :date="item.created_at.date" :author="item.author.fullname"/>
    </div>
  </b-container>
</template>

<script>
import api from '../config/ApiConfig';
import Message from './Message.vue';
import Contributor from './Contributor.vue';

export default {
  mounted() {
    const { id } = this.$route.params;
    api.get(`http://api.ticketmanager.com/tickets/get/${id}`).then((response) => {
      const { ticket } = response.data;
      const { messages } = response.data;
      this.$data.ticket = ticket;
      this.$data.messages = messages;
    });
  },
  name: 'TicketDetails',
  components: {
    Message,
    Contributor,
  },
  data() {
    return {
      ticket: {},
      messages: [],
    };
  },
};
</script>

<style scoped>
</style>
