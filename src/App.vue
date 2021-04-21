<template>
  <b-container fluid>
    <NavBar></NavBar>
    <router-view />
  </b-container>
</template>
<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>
