<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Quizzes" />
      <!--MENU DE TOPO-->
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col>
          <router-link
            :to="{name:'addQuiz'}"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR QUIZ
          </router-link>
          <router-link :to="{name:'admin'}" tag="button" class="btn btn-outline-info mr-2 mt-2">
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
      <!--TABLE-->
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NOME
                  <i class="fas fa-arrow-up" v-if="sortType===1" @click="sort()"></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>
                <th scope="col">NÍVEL</th>
                <th scope="col">PONTOS</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="quiz of quizzes" :key="quiz._id">
                <td class="pt-4">{{quiz.name}}</td>
                <td class="pt-4">{{quiz.level}}</td>
                <td class="pt-4">{{quiz.points}}</td>
                <td>
                  <router-link
                    :to="{name:'editQuiz', params:{quizId: quiz._id}}"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>
                  <button
                    @click="viewQuiz(quiz._id)"
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>
                  <button
                    @click="removeQuiz(quiz._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_QUIZZES, REMOVE_QUIZ } from "@/store/quizzes/quiz.constants";
import { mapGetters } from "vuex";
import HeaderPage from "@/components/HeaderPage.vue"
export default {
  name: "ListQuizzes",
   components: {
    HeaderPage
  },
  data: function() {
    return {
      quizzes: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("quiz", ["getQuizzes","getMessage"])
  },
  methods: {
    fetchQuizzes() {
      this.$store.dispatch(`quiz/${FETCH_QUIZZES}`).then( 
        () => {
          this.quizzes = this.getQuizzes;
        }, err => {
          this.$alert(`${err.message}`, 'Erro', 'error');
        });
    },
    sort() {
      this.quizzes.sort(this.compareNames)
      this.sortType *= -1      
    },
    compareNames(q1,q2) {
      if(q1.name > q2.name) return 1 * this.sortType
      else if(q1.name < q2.name) return -1 * this.sortType
      else return 0
    },
    viewQuiz(id) {
      const quiz = this.quizzes.find(quiz => quiz._id === id);
      this.$fire({
        title: quiz.name,
        html: this.generateTemplate(quiz)
        /* imageUrl: user.name,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Imagem desconhecida" */
      });
    },
    generateTemplate(quiz) {
      let response = `
          <p><b>Nível</b> ${quiz.level}<br>(${quiz.points} pontos)</p>
          <p><b>Lista de questões:</b></p>          
      `          
      for (const question of quiz.questions) {
       response += `<p>${question.question}</p>`
      }
      return response;
    },
    removeQuiz(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover a questão?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`quiz/${REMOVE_QUIZ}`, id).then(() => {
            this.$alert(
              this.getMessage,
              "Questão removida!",
              "success"
            );
            this.fetchQuizzes();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchQuizzes();
  }
};
</script>