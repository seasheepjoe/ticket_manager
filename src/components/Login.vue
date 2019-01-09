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
      <div id="invalid-feedback" v-if="error">{{ error_message }}</div>
    </b-form>
  </div>
</template>

<script>
import api from '../config/ApiConfig';

export default {
  name: 'Login',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      error: false,
      error_message: '',
    };
  },
  methods: {
    loginUser() {
      const that = this;
      api
        .post('http://api.ticketmanager.com/login', {
          email: this.$data.login.email,
          password: this.$data.login.password,
        })
        .then((response) => {
          const { data } = response;
          switch (data.status) {
            case 'success':
              that.$store.dispatch('setApiToken', data.user.apiToken);
              that.$store.dispatch('setUser', data.user);
              that.$router.push('/');
              break;
            case 'error':
              that.$data.error = true;
              that.$data.error_message = that.$i18n.t(data.message);
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
#invalid-feedback {
  color: red;
}
</style>
