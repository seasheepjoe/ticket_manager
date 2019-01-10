<template>
  <div id="app">
    <Header :route_name="this.$route.name" :username="username"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "app",
  components: {
    Header
  },
  data() {
    return {
      current_route: this.$route.name,
      username: this.$store.state.USERNAME
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
