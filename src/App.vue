<template>
  <div id="app">
    <Header :route_name="current_route"/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";

export default {
  name: "app",
  components: {
    Header,
    Home
  },
  data() {
    return {
      current_route: "Home"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
