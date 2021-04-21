<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Questão"/>

      <!--FORM-->
      <b-row>        
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="question.question"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="escreve a questão"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control"
                placeholder="escreve uma descrição"
                cols="30"
                rows="10"
                v-model="question.description"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <input
                v-model="question.level"
                type="number"
                min="1"
                max="5"
                class="form-control"
                id="txtLevel"
                placeholder="indica o nível da questão"
                required
              />
            </div>
            <div v-if="question.answers.length">
              <div class="row">
                <div class="col-md-7">
                  <h4>Lista de respostas</h4>
                </div>
                <div class="col-md-2">
                  <h4>Correta</h4>
                </div>
                <div class="col-md-3">
                  <h4>Ações</h4>
                </div>
              </div>
            </div>
            <div v-for="(answer, index) in question.answers" :key="answer.id">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-7">
                    <input
                      :key="index"
                      v-model.lazy="answer.title"
                      type="text"
                      class="form-control"
                      id="txtAnswer"
                      :placeholder="setPlaceHolder(index+1)"
                      required
                    />
                  </div>
                  <div class="col-md-2">
                    <input
                      :key="index"
                      v-model="answer.correct"
                      type="checkbox"
                      class="form-control"
                      id="chkAnswer"
                    />
                  </div>
                  <div class="col-md-3">
                    <button
                      @click="removeAnswer(index)"
                      type="button"
                      class="btn btn-outline-danger mr-2"
                    ><i class="fas fa-trash"></i> REMOVER</button>
                  </div>
                </div>
              </div>
            </div>
            <button
              @click="addAnswer"
              type="button"
              class="btn btn-outline-success mr-2"
            ><i class="fas fa-plus-square"></i> ADICIONAR RESPOSTAS</button>
            
            <button type="submit" class="btn btn-outline-success mr-2"><i class="fas fa-save"></i> ATUALIZAR</button>
            <router-link
              :to="{name: 'listQuestions'}"
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
import { EDIT_QUESTION } from "@/store/questions/question.constants";
import router from "@/router";
import HeaderPage from "@/components/HeaderPage.vue"
import { mapGetters } from "vuex";

export default {
  name: "EditQuestion",  
  components: {
    HeaderPage
  },
  data: () => {
    return {
      question: {}
    };
  },
  computed: {
    ...mapGetters("question", ["getQuestionById","getMessage"])
  },
  methods: {
    update() {
      this.$store
        .dispatch(`question/${EDIT_QUESTION}`, this.$data.question)
        .then(
          () => {
            this.$alert(this.getMessage, "Questão atualizada!",  "success");
            router.push({name: 'listQuestions'});
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    },
    setPlaceHolder: index => {
      return `insira a ${index}ª resposta`;
    },
    addAnswer() {
      this.question.answers.push({
        title: "",
        description: "",
        correct: false
      });
    },
    removeAnswer(index) {
      this.question.answers.splice(index, 1);
    }
  },
  created() {
    this.question = this.getQuestionById(this.$route.params.questionId);
  }
};
</script>
