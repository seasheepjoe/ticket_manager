<template>
  <div id="app">
    <b-form @submit="onSubmit" @reset="onReset">
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
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  }
};
</script>

<style>
</style>
