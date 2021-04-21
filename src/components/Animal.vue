<template>
  <b-col cols="4">
    <b-card
      :title="animal.name"
      :img-src="animal.links[0].url"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-5"
    >
      <b-card-text>
        <kbd>{{ animal.group }}</kbd>&nbsp;
        <kbd style="background-color: red">nível {{ animal.level }}</kbd>
      </b-card-text>
      <b-card-text>{{animal.description}}</b-card-text>
      <b-card-text align="left">
        <i class="fas fa-star fa-lg" :style="{color}" @click="evaluate()"></i>
        {{animal.evaluation.length}}
        <i class="fas fa-comment fa-lg ml-2"></i>
        {{animal.comments.length}}
      </b-card-text>

      <router-link
        :to="{name: 'animal', params:{animalId: animal._id}}"
        tag="b-button"
        variant="outline-success"
        align="center"
        class="mr-2"
      >
        <i class="fas fa-search"></i> ver animal
      </router-link>
      <b-button variant="info" :href="'https://www.facebook.com/sharer/sharer.php?u=' + animal.links[0].url" target="_blank">
        <i class="fab fa-facebook"></i> Partilhar
      </b-button>

    </b-card>
  </b-col>
</template>

<script>
import { EDIT_ANIMAL } from "@/store/animals/animal.constants";
import { mapGetters } from "vuex";

export default {
  name: "Animal",
  props: ["animal"],
  data: function() {
    return {
      color: ""
    };
  },
  methods: {
    ...mapGetters("auth", ["getProfile"]),
    evaluate() {
      if (!this.animal.evaluation.includes(this.getProfile()._id)) {
        this.animal.evaluation.push(this.getProfile()._id);
        this.color = "red";
      } else {
        this.animal.evaluation = this.animal.evaluation.filter(
          user => user !== this.getProfile()._id
        );
        this.color = "black";
      }
      this.$store.dispatch(`animal/${EDIT_ANIMAL}`, this.animal).then(
        () => {
          this.$alert(
            `Obrigado por gostares do ${this.animal.name}!`,
            "Gosto",
            "success"
          );
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    if (!this.animal.evaluation.includes(this.getProfile()._id)) {
      this.color = "black";
    } else {
      this.color = "red";
    }
  }
};
</script>
