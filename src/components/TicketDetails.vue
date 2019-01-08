<template>
  <b-container>
    <div class="ticket">
      <div class="contributors" :key="index" v-for="(item, index) in ticket.contributors">
        <div id="contributor">{{ item.fullname }}</div>
      </div>
    </div>
    <div class="messages-list" :key="index" v-for="(item, index) in messages">
      <b-list-group-item>
        <b-row id="small">{{ item.author.fullname }}</b-row>
        <b-row id="content">{{ item.content }}</b-row>
        <b-row id="small">{{ item.created_at.date | format }}</b-row>
      </b-list-group-item>
    </div>
  </b-container>
</template>

<script>
import api from "../config/ApiConfig";

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
  data() {
    return {
      ticket: {},
      messages: []
    };
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
