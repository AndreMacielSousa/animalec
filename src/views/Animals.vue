<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Animais" />

      <!-- Portfolio Grid Items -->
      <b-row>
        <!--FILTRO-->

        <div class="form-group mb-5">
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="procura pelo nome..."
            v-model="filterName"
          />
        </div>
        <div class="form-group mx-sm-3 mb-5">
          <select class="form-control form-control-lg" v-model="filterGroup">
            <option value="todos">todos os grupos</option>
            <option value="anfíbio">anfíbios</option>
            <option value="ave">aves</option>
            <option value="mamífero">mamíferos</option>
            <option value="peixe">peixes</option>
            <option value="réptil">répteis</option>
          </select>
        </div>
        <div class="form-group mx-sm-3 mb-5">
          <select class="form-control form-control-lg" v-model="filterLevel">
            <option value="todos">todos os níveis</option>
            <option value="1">nível 1</option>
            <option value="2">nível 2</option>
            <option value="3">nível 3</option>
            <option value="4">nível 4</option>
            <option value="5">nível 5</option>
          </select>
        </div>
        <div class="form-group mb-5">
          <button class="btn btn-success btn-lg" @click="sortAnimals">
            <i :class="classSorter"></i> ordenar
          </button>
        </div>
      </b-row>
      <div class="row">
        <Animal v-for="a in filteredAnimals" :key="a.id" :animal="a"></Animal>
      </div>
    </b-container>
  </section>
</template>

<script>
import Animal from "@/components/Animal.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";

import { mapGetters } from "vuex";

export default {
  name: "Animals",
  components: {
    HeaderPage,
    Animal
  },
  data: function() {
    return {
      filterName: "",
      filterGroup: "todos",
      filterLevel: "todos",
      reverse: false,
      animals: [],
      userLevel:0
    };
  },
  computed: {
    ...mapGetters(["getUserLevelByPoints"]),
    ...mapGetters('auth', ["getProfile"]),
    ...mapGetters("animal", ["getAnimals","getMessage"]),
    classSorter() {
      return {
        "fas fa-sort-alpha-up": !this.reverse,
        "fas fa-sort-alpha-down": this.reverse
      };
    },
    filteredAnimals() {
      return this.animals.filter(animal => {
        let filterNameResult = true,
          filterGroupResult = true,
          filterLevelResult = true;
        if (this.filterName != "") {
          filterNameResult = animal.name.includes(this.filterName);
        }
        if (this.filterName != "") {
          filterNameResult = animal.name.includes(this.filterName);
        }
        if (this.filterGroup != "todos") {
          filterGroupResult = animal.group == this.filterGroup;
        }
        if (this.filterLevel != "todos") {
          filterLevelResult = animal.level == this.filterLevel;
        }
        return filterNameResult && filterGroupResult && filterLevelResult;
      });
    }
  },
  methods: {
    compareAnimalNames(animal1, animal2) {
      if (!this.reverse) {
        if (animal1.name > animal2.name) return 1;
        if (animal1.name < animal2.name) return -1;
      } else {
        if (animal1.name < animal2.name) return 1;
        if (animal1.name > animal2.name) return -1;
      }
      return 0;
    },
    sortAnimals() {
      this.animals.sort(this.compareAnimalNames);
      this.reverse = !this.reverse;
    }
  },
  created() {
    this.$store
      .dispatch(`animal/${FETCH_ANIMALS}`)
      .then(
        () => {
          this.animals = this.getAnimals.filter(
            animal => animal.level <= this.getUserLevelByPoints(this.getProfile.gamification.points).level
          )
        },
        err => this.$alert(`${err.message}`, "Erro", "error")
      );
  }
};
</script>
