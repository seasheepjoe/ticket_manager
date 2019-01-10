<template>
  <b-list-group-item>
    <b-row id="small">{{ author }}</b-row>
    <b-row id="content">{{ content }}</b-row>
    <b-row id="small">{{ date | format }}</b-row>
    <span @click="deleteMessage">&times;</span>
  </b-list-group-item>
</template>


<script>
import api from "../config/ApiConfig";

export default {
  name: 'Message',
  props: {
    author: String,
    content: String,
    date: String,
    onMessageDeleted: Function,
    message_id: Number,
    ticket_id: Number,
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
    }
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

<style scoped>
#content {
  margin: 10px;
}

#small {
  font-size: 12px;
  color: grey;
  margin: 10px;
}

span:hover {
  color: red;
  transition: all 0.2s;
  cursor: pointer;
}

span {
  position: absolute;
  font-size: 50px;
  right: 2.5%;
  top: 17.5%;
}
</style>
