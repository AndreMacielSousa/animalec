<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Animal" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="animal.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
              <select id="sltGroup" class="form-control form-control-lg" v-model="animal.group">
                <option value>-- SELECIONA GRUPO --</option>
                <option value="anfibio">ANFÍBIO</option>
                <option value="ave">AVE</option>
                <option value="mamifero">MAMÍFERO</option>
                <option value="peixe">PEIXE</option>
                <option value="reptil">RÉPTIL</option>
              </select>
            </div>
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="escreve descrição"
                cols="30"
                rows="10"
                v-model="animal.description"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <div class="form-group">
                <input
                  v-model="animal.level"
                  type="number"
                  min="1"
                  max="5"
                  class="form-control form-control-lg"
                  id="txtLevel"
                  placeholder="escreve o nível"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <input
                v-model="animal.links[0].url"
                type="url"
                class="form-control form-control-lg"
                id="txtPhoto"
                placeholder="escreve link para foto"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="animal.links[1].url"
                type="url"
                class="form-control form-control-lg"
                id="txtPhoto"
                placeholder="escreve link para vídeo"
              />
            </div>
            <div class="form-group">
              <input
                v-model="animal.links[2].url"
                type="url"
                class="form-control form-control-lg"
                id="txtSound"
                placeholder="escreve link para som"
              />
            </div>
            <button type="button" class="btn btn-outline-success btn-lg mr-2" @click="removeComments()">
              <i class="fas fa-edit"></i> REMOVER COMENTÁRIOS
            </button>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>
            <router-link
              :to="{name: 'listAnimals'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { EDIT_ANIMAL } from "@/store/animals/animal.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditAnimal",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      animal: {}
    };
  },
  computed: {
    ...mapGetters("animal", ["getAnimalsById", "getMessage"])
  },
  methods: {
    removeComments() {
      this.animal.comments.length = 0
      this.$alert("Comentários removidos, clique em atualizar!", "Comentários!", "success");
    },
    update() {
      this.$store.dispatch(`animal/${EDIT_ANIMAL}`, this.$data.animal).then(
        () => {
          this.$alert(this.getMessage, "Animal atualizado!", "success");
          router.push({ name: "listAnimals" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.animal = this.getAnimalsById(this.$route.params.animalId);
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>