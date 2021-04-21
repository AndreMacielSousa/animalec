<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Quiz"/>
      
      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="escreve o nome"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="level"
                type="text"
                onmouseenter="(this.type='number')"
                onmouseleave="(this.type='text')"
                min="1"
                max="10"
                class="form-control"
                id="txtLevel"
                placeholder="indica o nível do quiz"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="points"
                type="text"
                 onmouseenter="(this.type='number')"
                onmouseleave="(this.type='text')"
                min="1"
                class="form-control"
                id="txtLevel"
                placeholder="indica os pontos a ganhar"
                required
              />
            </div>
            <div v-if="questions.length">
              <div class="row">
                <div class="col-md-9">
                  <h4>Lista de questões</h4>
                </div>
                <div class="col-md-3">
                  <h4>Ações</h4>
                </div>
              </div>
            </div>
            <div v-for="(question, index) in questions" :key="question.id">
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
                    ><i class="fas fa-trash"></i> REMOVER</button>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              @click="addQuestion"
              type="button"
              class="btn btn-outline-success mr-2"
            ><i class="fas fa-plus-square"></i> ADICIONAR QUESTÕES</button>
            <!--<pre>{{ $data }}</pre>-->
            <button type="submit" class="btn btn-outline-success mr-2"><i class="fas fa-save"></i> GRAVAR QUIZ</button>
            <router-link
              :to="{name: 'listQuizzes'}"
              tag="button"
              class="btn btn-outline-danger"
            ><i class="fas fa-window-close"></i> CANCELAR</router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_QUIZ } from "@/store/quizzes/quiz.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import { FETCH_QUESTIONS } from "@/store/questions/question.constants";
import router from "@/router";

import { mapGetters } from "vuex";

export default {
  name: "AddQuiz",
   components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      level: "",
      points: "",
      questions: [],
      myQuestions: []
    };
  },
  computed: {
    ...mapGetters("quiz", ["getMessage"]),
    ...mapGetters("question", ["getQuestions"]),
    getQuestionsByLevel() {
      return this.myQuestions.filter(question => question.level == this.level);
    }
  },
  methods: {
    setPlaceHolder: index => {
      return `insira a ${index}ª resposta`;
    },
    addQuestion() {
      this.questions.push({ id: "" });
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
    },

    add() {
      this.questions = this.questions.map(question => question["id"]);
      this.$store
        .dispatch(`quiz/${ADD_QUIZ}`, {
          name: this.name,
          level: this.level,
          points: this.points,
          questions: this.questions
        })
        .then(
          () => {
            this.$alert(this.getMessage, "Quiz adicionado!", "success");
            router.push({name: 'listQuizzes'});
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  },
  created() {
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