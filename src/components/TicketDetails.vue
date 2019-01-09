<template>
  <b-container id="container" v-if="loaded">
    <div class="ticket">
      <h1>{{ ticket.title }}</h1>
      <h3>{{ ticket.created_at.date | format }}</h3>
      <h5>{{ ticket.author.fullname }}</h5>
      <div :key="index" v-for="(item, index) in ticket.contributors">
        <Contributor :fullname="item.fullname" :ticketId="ticket.id" :contributorId="item.id"/>
      </div>
      <b-form-input
        id="search-input"
        type="text"
        v-model="search"
        required
        placeholder="Search users"
      ></b-form-input>
      <div :key="index" v-for="(item, index) in users">{{ item.fullname }}</div>
    </div>
    <div class="no-message" v-if="messages.length === 0">No messages in this ticket</div>
    <div class="messages-list" :key="index" v-for="(item, index) in messages">
      <Message :content="item.content" :date="item.created_at.date" :author="item.author.fullname"/>
    </div>
    <b-form @submit.prevent="createMessage" class="new-message">
      <b-form-group id="group-content" label="Message :" label-for="content-input">
        <b-form-input
          id="content-input"
          type="text"
          v-model="newMessage.content"
          required
          placeholder="your content"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Post</b-button>
    </b-form>
  </b-container>
</template>

<script>
import api from "../config/ApiConfig";
import Message from "./Message.vue";
import Contributor from "./Contributor.vue";

export default {
  created() {
    const { id } = this.$route.params;
    api.get(`http://api.ticketmanager.com/tickets/get/${id}`).then(response => {
      const { ticket } = response.data;
      const { messages } = response.data;
      this.$data.ticket = ticket;
      this.$data.messages = messages;
      this.loaded = true;
    });
  },
  name: "TicketDetails",
  components: {
    Message,
    Contributor
  },
  data() {
    return {
      ticket: {},
      messages: [],
      newMessage: {
        content: ""
      },
      users: [],
      search: "",
      loaded: false
    };
  },
  methods: {
    createMessage() {
      const that = this;
      api
        .post("http://api.ticketmanager.com/tickets/messages/add", {
          ticket_id: that.ticket.id,
          message_content: this.newMessage.content
        })
        .then(response => {
          const { data } = response;
          switch (data.status) {
            case "success":
              that.messages.unshift(data.message);
              that.newMessage.content = "";
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
  computed: {
    filterUsers() {
      return this.users.filter(user =>
        user.title.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  filters: {
    format(date) {
      const formatted = new Date(date).toLocaleDateString("en-EN", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      });
      return formatted;
    }
  }
};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.new-message {
  border: 1px solid black;
  padding: 15px;
  width: 20%;
  align-self: flex-end;
  position: absolute;
}
</style>
