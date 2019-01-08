<template>
  <b-navbar toggleable type="light" variant="light">
    <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
    <b-navbar-brand>
      {{ route_name }}
      <span :v-if="username !== null">{{ username }}</span>
    </b-navbar-brand>
    <b-collapse is-nav id="nav_text_collapse">
      <b-navbar-nav :key="index" v-for="(item, index) in routes">
        <b-nav-item>
          <router-link :to="item.path">{{ item.name }}</router-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-nav-item @click="logout">Logout</b-nav-item>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  props: {
    route_name: String,
    username: String,
  },
  data() {
    return {
      routes: this.$router.options.routes,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
</style>
