<template>
  <b-card bg-variant="secondary" text-variant="white" :header="title.toUpperCase()" class="text-center">
    <router-link :to="{name: routeName}">
      <i :class="'fas fa-' + iconName + ' fa-5x'"></i>
    </router-link>
  </b-card>
</template>

<script>
export default {
  name: "AdminOptionBox",
  props: ["routeName", "iconName", "title"]
};
</script>
