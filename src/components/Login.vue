<template>
  <div id="app">
    <b-form @submit.prevent="loginUser">
      <b-form-group id="group-email" label="Email :" label-for="email-input">
        <b-form-input
          id="email-input"
          type="email"
          v-model="login.email"
          required
          placeholder="john.doe@gmail.com"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="group-password" label="Password :" label-for="password-input">
        <b-form-input
          id="password-input"
          type="password"
          v-model="login.password"
          required
          placeholder="thebestpassword"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      error: false,
      error_message: ""
    };
  },
  methods: {
    loginUser(ev) {
      let that = this;
      axios
        .post("http://api.ticketmanager.com/login", {
          email: this.$data.login.email,
          password: this.$data.login.password
        })
        .then(function(response) {
          let data = response.data;
          switch (data.status) {
            case "success":
              console.log("SUCCESS");
            case "error":
              that.$data.error = true;
              that.$data.error_message = 0; // add i18n
              console.log(that.$data.error_message);
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {});
    }
  }
};
</script>

<style>
</style>
