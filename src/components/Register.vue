<template>
  <div id="app">
    <b-form @submit.prevent="registerUser">
      <b-form-group id="group-firstname" label="Firstname :" label-for="firstname-input">
        <b-form-input
          id="firstname-input"
          type="text"
          v-model="register.firstname"
          required
          placeholder="John"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="group-lastname" label="Lastname :" label-for="lastname-input">
        <b-form-input
          id="lastname-input"
          type="text"
          v-model="register.lastname"
          required
          placeholder="Doe"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="group-email" label="Email :" label-for="email-input">
        <b-form-input
          id="email-input"
          type="email"
          v-model="register.email"
          required
          placeholder="john.doe@gmail.com"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="group-password" label="Password :" label-for="password-input">
        <b-form-input
          id="password-input"
          type="password"
          v-model="register.password"
          required
          placeholder="thebestpassword"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="group-password-check"
        label="Password check :"
        label-for="password-check-input"
      >
        <b-form-input
          id="password-check-input"
          type="password"
          v-model="register.passwordCheck"
          required
          placeholder="thebestpassword"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Register</b-button>
      <div id="invalid-feedback" v-if="error">{{ error_message }}</div>
    </b-form>
  </div>
</template>

<script>
import api from "../config/ApiConfig";

export default {
  name: "Register",
  data() {
    return {
      register: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordCheck: ""
      },
      error: false,
      error_message: ""
    };
  },
  methods: {
    registerUser() {
      let that = this;
      api
        .post("http://api.ticketmanager.com/register", {
          firstname: this.$data.register.firstname,
          lastname: this.$data.register.lastname,
          email: this.$data.register.email,
          password: this.$data.register.password,
          password_check: this.$data.register.passwordCheck
        })
        .then(function(response) {
          let data = response.data;
          switch (data.status) {
            case "success":
              that.$store.dispatch("setApiToken", data.user.apiToken);
              that.$store.dispatch("setUser", data.user);
            case "error":
              that.$data.error = true;
              that.$data.error_message = that.$i18n.t(data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#invalid-feedback {
  color: red;
}
</style>
