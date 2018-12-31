<template>
  <div id="app">
    <Header :route_name="current_route"/>
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
      current_route: this.$route.name
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
