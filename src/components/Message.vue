<template>
  <b-list-group-item @blur="stopEditing">
    <b-row id="small">{{ author }}</b-row>
    <b-row v-if="!editing" id="content">{{ content }}</b-row>
    <b-form-textarea wrap="soft" v-if="editing" id="content" type="text" v-model="new_content" required></b-form-textarea wrap="soft">
    <b-row id="small">{{ date | format }}</b-row>
    <span id="delete" v-if="$store.state.IS_ADMIN" @click="deleteMessage">&times;</span>
    <span id="edit" v-if="$store.state.IS_ADMIN" @click="editMessage">EDIT</span>
    <b-button @click="editMessageContent" type="submit" variant="primary">Post</b-button>
  </b-list-group-item>
</template>


<script>
import api from "../config/ApiConfig";

export default {
  name: "Message",
  props: {
    author: String,
    content: String,
    date: String,
    onMessageDeleted: Function,
    message_id: Number,
    ticket_id: Number
  },
  data() {
    return {
      editing: false,
      new_content: ""
    };
  },
  methods: {
    deleteMessage() {
      const { message_id, ticket_id } = this;
      const that = this;
      api
        .post("http://api.ticketmanager.com/tickets/messages/remove", {
          ticket_id,
          message_id
        })
        .then(response => {
          const { data } = response;
          switch (data.status) {
            case "success":
              that.onMessageDeleted(message_id);
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
    editMessage() {
      this.editing = true;
    },
    editMessageContent() {
      const that = this;
      const ticket_id = this.ticket_id;
      const message_id = this.message_id;
      api
        .post("http://api.ticketmanager.com/tickets/messages/edit", {
          ticket_id,
          message_id,
          message_content: that.new_content
        })
        .then(response => {
          const { data } = response;
          switch (data.status) {
            case "success":
              that.editing = false;
              that.content = data.content;
              that.$router.go();
              break;
            case "error":
              that.editing = false;
              break;
            default:
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    stopEditing() {
      this.editing = false;
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
#content {
  margin: 10px;
}

#small {
  font-size: 12px;
  color: grey;
  margin: 10px;
}

#delete:hover {
  color: red;
  transition: all 0.2s;
}

span {
  position: absolute;
  font-size: 50px;
  right: 2.5%;
  cursor: pointer;
}

#delete {
  top: 0;
}

#edit {
  top: 5%;
  font-size: 12.5px;
}

#edit:hover {
  color: blue;
  transition: all 0.2s;
}
</style>
