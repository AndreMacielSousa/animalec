<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Quiz" />
      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="quiz.name"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="escreve o nome do quiz"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="quiz.level"
                type="number"
                min="1"
                max="10"
                onmouseenter="(this.type='number')"
                onmouseleave="(this.type='text')"
                class="form-control"
                id="txtLevel"
                placeholder="indica o nível do quiz"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="quiz.points"
                type="number"
                min="1"
                onmouseenter="(this.type='number')"
                onmouseleave="(this.type='text')"
                class="form-control"
                id="txtLevel"
                placeholder="indica os pontos"
                required
              />
            </div>
            
            <div v-if="quiz.questions.length">
              <div class="row">
                <div class="col-md-9">
                  <h4>Lista de questões</h4>
                </div>
                <div class="col-md-3">
                  <h4>Ações</h4>
                </div>
              </div>
            </div>
            <div v-for="(question, index) in quiz.questions" :key="question.id">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-9">
                   <select
                      v-model="question.id"
                      :key="index"
                      class="form-control"
                      required
                    >
                      <option
                        v-for="q in getQuestionsByLevel"
                        :key="q._id"
                        :value="q._id"
                      >{{q.question}}</option>
                    </select>
                  </div>
                 
                  <div class="col-md-3">
                    <button
                      @click="removeQuestion(index)"
                      type="button"
                      class="btn btn-outline-danger mr-2"
                    >
                      <i class="fas fa-trash"></i> REMOVER
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button @click="addQuestion" type="button" class="btn btn-outline-success mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR QUESTÕES
            </button>

            <button type="submit" class="btn btn-outline-success mr-2">
              <i class="fas fa-save"></i> ATUALIZAR
            </button>
            <router-link
              :to="{name: 'listQuizzes'}"
              tag="button"
              class="btn btn-outline-danger"
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
import { EDIT_QUIZ } from "@/store/quizzes/quiz.constants";
import router from "@/router";
import HeaderPage from "@/components/HeaderPage.vue"
import { FETCH_QUESTIONS } from "@/store/questions/question.constants";
import { mapGetters } from "vuex";

export default {
  name: "EditQuiz",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      quiz: {},
      myQuestions: []
    };
  },
  computed: {
    ...mapGetters("quiz", ["getQuizById", "getMessage"]),
    ...mapGetters("question", ["getQuestions"]),
    getQuestionsByLevel() {
      return this.myQuestions.filter(question => question.level == this.quiz.level);
    }
  },
  methods: {
    setPlaceHolder: index => {
      return `insira a ${index}ª resposta`;
    },
    addQuestion() {
      this.quiz.questions.push({id:"" });
    },
    removeQuestion(index) {
      this.quiz.questions.splice(index, 1);
    },
    update() {
      this.$store
        .dispatch(`quiz/${EDIT_QUIZ}`, this.$data.quiz)
        .then(
          () => {
            this.$alert(this.getMessage, "Quiz atualizado!","success");
            router.push({name: 'listQuizzes'});
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  },
  created() {
    this.quiz = this.getQuizById(this.$route.params.quizId);
    this.$store.dispatch(`question/${FETCH_QUESTIONS}`).then(
      () => {
        this.myQuestions = this.getQuestions;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
  }
};
</script>
