<template>
  <div id="container" v-if="loaded">
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
    <div class="ticket">
      <h1 id="ticket-info">{{ ticket.title }}</h1>
      <h3 id="ticket-info">{{ ticket.created_at.date | format }}</h3>
      <h6 id="ticket-info">{{ ticket.author.fullname }}</h6>
      <div :key="index" v-for="(item, index) in ticket.contributors" v-if="$store.state.IS_ADMIN">
        <Contributor
          :on-contributor-removed="onContributorRemoved"
          :fullname="item.fullname"
          :ticketId="ticket.id"
          :contributorId="item.id"
        />
      </div>
      <div :key="index" v-for="(item, index) in users">{{ item.fullname }}</div>
      <div class="no-message" v-if="messages.length === 0">No messages in this ticket</div>
      <div class="messages-list" :key="index" v-for="(item, index) in messages">
        <Message
          :content="item.content"
          :message_id="item.id"
          :ticket_id="ticket.id"
          :date="item.created_at.date"
          :author="item.author.fullname"
          :on-message-deleted="onMessageDeleted"
        />
      </div>
    </div>
    <div class="users" v-if="$store.state.IS_ADMIN">
      <b-form-input
        id="search-input"
        type="text"
        v-model="searchQuery"
        @keydown="searchUsers"
        required
        placeholder="Search users"
      ></b-form-input>
    </div>
  </div>
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
      searchQuery: "",
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
    },
    searchUsers() {
      console.log(this.searchQuery);
    },
    onContributorRemoved(id) {
      let data = this.ticket.contributors;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          data.splice(i, 1);
          break;
        }
      }
    },
    onMessageDeleted(id) {
      let data = this.messages;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          data.splice(i, 1);
          break;
        }
      }
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
  padding: 0;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#ticket-info {
  margin: 15px 0;
}

.users {
  width: 75%;
  margin: 20px;
}

.ticket {
  width: 100%;
  padding: 10px;
  margin: 20px;
}

.new-message {
  border: 1px solid black;
  padding: 15px;
  width: 80%;
  right: 0;
  margin: 20px;
}
</style>
