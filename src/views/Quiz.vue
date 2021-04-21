<template>
  <section class="page-section">
    <b-container>
      <HeaderPage :title="'Quiz nº' + quiz.level + ' - ' + quiz.name" />
      <b-row>
        <b-col cols="1"></b-col>
        <b-col cols="10" align="right">{{seconds}}</b-col>
        <b-col cols="1"></b-col>
      </b-row>
      <b-row>
        <b-col cols="1"></b-col>
        <b-col cols="10">
          <div>
            <b-card no-body>
              <b-tabs pills card vertical>
                <b-tab
                  :disabled="currentQuestion !== index + 1"
                  v-for="(question, index) in quiz.questions"
                  :key="question.id"
                  :title="'QUESTÃO #' + (index + 1)"
                >
                  <b-card
                    :title="question.question"
                    :sub-title="'nível: ' + question.level + ' | tipo: ' + question.type"
                  >
                    <b-card-text v-html="question.description" />
                    <b-form-group label="Respostas possíveis">
                      <b-form-radio
                        v-for="answer in question.answers"
                        :key="answer.id"
                        v-model="option"
                        name="some-radios"
                        :value="answer._id"
                      >{{answer.title}}</b-form-radio>
                    </b-form-group>
                    <b-button variant="outline-success" @click="setAnswer()">RESPONDER</b-button>
                  </b-card>
                </b-tab>
                <b-tab title="RESULTADOS" :disabled="currentQuestion <= quiz.questions.length">
                  <b-card-text class="text-center">
                    <div>
                      <h5>Respostas certas</h5>
                      <b-progress
                        :value="correctAnswers"
                        :max="quiz.questions.length"
                        variant="success"
                        show-value
                        class="mb-3"
                      ></b-progress>
                      <h5>Respostas erradas</h5>
                      <b-progress
                        :value="quiz.questions.length - correctAnswers"
                        :max="quiz.questions.length"
                        variant="danger"
                        show-value
                        class="mb-3"
                      ></b-progress>
                    </div>

                    <div v-if="quiz.questions.length === correctAnswers">
                      <i class="fas fa-smile fa-3x"></i>
                      <br />
                      <h2>PARABÉNS, GANHASTE {{quiz.points}} PONTOS!</h2>
                      <br />
                      <router-link :to="{name: 'quizzes'}" tag="b-button" variant="outline-success" class="mr-2">
                        <i class="fas fa-poll-h"></i> JOGAR NOVO NÍVEL DO QUIZ
                      </router-link>
                      <router-link :to="{name: 'home'}" tag="b-button" variant="outline-success" class="mr-2">
                        <i class="fas fa-home"></i> PÁGINA PRINCIPAL
                      </router-link>
                      <b-button variant="outline-info" @click="evaluate()">VER ANIMAIS</b-button>
                    </div>
                    <div v-else>
                      <i class="fas fa-frown fa-3x"></i>
                      <br />
                      <h2>PACIÊNCIA, JOGA DE NOVO!</h2>
                      <br />
                      <b-button
                        variant="outline-success"
                        @click="evaluate()"
                        class="mr-2"
                      >JOGAR NOVAMENTE ESTE QUIZ</b-button>
                      <b-button variant="outline-info" @click="evaluate()">VER ANIMAIS</b-button>
                    </div>
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
    <pre>
    {{this.$data}}
  </pre>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
import { EDIT_USER } from "@/store/users/user.constants";

export default {
  name: "Animal",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      quiz: "",
      option: "",
      currentQuestion: 1,
      answers: [],
      correctAnswers: 0,
      seconds: 30
    };
  },
  computed: {
    ...mapGetters("auth", ["getProfile"]),
    ...mapGetters("user", ["getUsersById"]),
    ...mapGetters("quiz", ["getQuizById"])
  },
  methods: {
    setAnswer() {
      this.answers.push(this.option);
      this.currentQuestion += 1;
      if (this.currentQuestion > this.quiz.questions.length) {
        this.evaluate();
      }
    },
    evaluate() {
      let i = 0;
      for (const question of this.quiz.questions) {
        const id = question.answers.filter(answer => answer.correct === true)[0]
          ._id;
        if (id == this.answers[i]) {
          this.correctAnswers += 1;
        }
        i++;
      }
      if (this.correctAnswers === this.quiz.questions.length) {
        this.setScore(this.quiz.points);
      }
    },
    setScore(points) {
      const user = this.getProfile 
      user.gamification.points += points
      user.gamification.quiz += 1
      
      this.$store.dispatch(`user/${EDIT_USER}`, user).then(
        () => {
          //this.$alert("Score atualizado!", "Utilizador atualizado!", "success");
          //router.push({ name: "home" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.quiz = this.getQuizById(this.$route.params.quizId);
    let x = setInterval(function() {
      this.seconds -= 1;
      if (this.seconds < 0) {
        clearInterval(x);
        this.seconds = "EXPIRED";
      }
    }, 1000);
  }
};
</script>

<style>
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
