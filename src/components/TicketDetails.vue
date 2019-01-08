<template>
  <b-container>
    <div class="ticket">
      <div class="contributors" :key="index" v-for="(item, index) in ticket.contributors">
        <div id="contributor">{{ item.fullname }}</div>
      </div>
    </div>
    <div class="messages-list" :key="index" v-for="(item, index) in messages">
      <Message :content="item.content" :date="item.created_at.date" :author="item.author.fullname"/>
    </div>
  </b-container>
</template>

<script>
import api from "../config/ApiConfig";
import Message from "./Message.vue";

export default {
  mounted() {
    let id = this.$route.params.id;
    api.get(`http://api.ticketmanager.com/tickets/get/${id}`).then(response => {
      let ticket = response.data.ticket;
      let messages = response.data.messages;
      this.$data.ticket = ticket;
      this.$data.messages = messages;
    });
  },
  name: "TicketDetails",
  components: {
    Message
  },
  data() {
    return {
      ticket: {},
      messages: []
    };
  }
};
</script>

<style>
#content {
  margin: 10px;
}

#small {
  font-size: 12px;
  color: grey;
  margin: 10px;
}

#contributor {
  margin: 5px 0;
  padding: 10px;
  border: 1px solid black;
  width: fit-content;
  font-size: 15px;
}
</style>
