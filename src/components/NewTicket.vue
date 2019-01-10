<template>
  <b-form @submit.prevent="createTicket">
    <b-form-group id="group-title" label="Title :" label-for="title-input">
      <b-form-input
        id="title-input"
        type="text"
        v-model="ticket.title"
        required
        placeholder="Nice title"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="group-title" label="Title :" label-for="title-input">
      <b-form-input
        id="content-input"
        type="text"
        v-model="ticket.message"
        required
        placeholder="Nice message"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Create</b-button>
    <div id="invalid-feedback" v-if="error">{{ error_message }}</div>
  </b-form>
</template>

<script>
import api from "../config/ApiConfig";

export default {
  name: "NewTicket",
  data() {
    return {
      ticket: {
        title: "",
        message: ""
      },
      error: false,
      error_message: ""
    };
  },
  methods: {
    createTicket() {
      let that = this;
      api
        .post("http://api.ticketmanager.com/tickets/new", {
          ticket_title: this.$data.ticket.title,
          ticket_message: this.$data.ticket.message
        })
        .then(response => {
          const { data } = response;
          switch (data.status) {
            case "success":
              console.log(data);
              that.$router.push("/");
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
  }
};
</script>

<style></style>