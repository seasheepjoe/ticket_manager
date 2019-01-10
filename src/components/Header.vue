<template>
  <b-navbar toggleable type="light" variant="light">
    <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
    <b-navbar-brand>
      {{ route_name }}
      <span :v-if="username !== null">{{ username }}</span>
    </b-navbar-brand>
    <b-collapse is-nav id="nav_text_collapse">
      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/">Home</router-link>
        </b-nav-item>
        <b-nav-item v-if="$store.state.API_TOKEN === null">
          <router-link to="/login/">Login</router-link>
        </b-nav-item>
        <b-nav-item v-if="$store.state.API_TOKEN === null">
          <router-link to="/register/">Register</router-link>
        </b-nav-item>
        <b-nav-item v-if="$store.state.API_TOKEN !== null">
          <router-link to="/new/">New ticket</router-link>
        </b-nav-item>
        <b-nav-item @click="logout" v-if="$store.state.API_TOKEN !== null">
          <router-link to="/">Logout</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  props: {
    route_name: String,
    username: String
  },
  data() {
    return {
      routes: this.$router.options.routes
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
      this.$router.go();
    }
  }
};
</script>

<style scoped>
</style>
