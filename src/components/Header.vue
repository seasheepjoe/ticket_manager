<template>
  <b-navbar toggleable type="light" variant="light">
    <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
    <b-navbar-brand>{{ route_name }}</b-navbar-brand>
    <b-collapse is-nav id="nav_text_collapse">
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>
        <b-nav-item href="#">Link</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  props: {
    route_name: String
  }
};
</script>

<style scoped>
</style>
