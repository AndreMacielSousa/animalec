<template>
  <b-container>
    <b-row class="text-center">
      <b-col>
        <h2 class="page-section-heading mt-5">{{title.toUpperCase()}}</h2>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="divider-custom-line"></div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "HeaderPage",
  props: ["title"]
};
</script>

<style scoped>
.divider-custom {
  margin: 1.25rem 0 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.divider-custom .divider-custom-line {
  width: 100%;
  max-width: 7rem;
  height: 0.25rem;
  background-color: #2c3e50;
  border-radius: 1rem;
  border-color: #2c3e50 !important;
}

.divider-custom .divider-custom-line:first-child {
  margin-right: 1rem;
}

.divider-custom .divider-custom-line:last-child {
  margin-left: 1rem;
}

.divider-custom .divider-custom-icon {
  color: #2c3e50 !important;
  font-size: 2rem;
}

.divider-custom.divider-light .divider-custom-line {
  background-color: #fff;
}

.divider-custom.divider-light .divider-custom-icon {
  color: #fff !important;
}
</style>