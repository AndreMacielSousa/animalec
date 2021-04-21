<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Questão"/>

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="question"
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
                v-model="description"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <input
                v-model="level"
                type="text"                
                min="1"
                max="5"
                onmouseenter="(this.type='number')"
                onmouseleave="(this.type='text')"                
                class="form-control"
                id="txtLevel"
                placeholder="indica o nível da questão"
                required
              />
            </div>
            <div v-if="answers.length">
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
            <div v-for="(answer, index) in answers" :key="answer.title">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-7">
                    <input
                      v-model.lazy="answer.title"
                      type="text"
                      class="form-control"
                      id='txtAnswer'
                      :placeholder="setPlaceHolder(index+1)"
                      
                    />
                  </div>
                  <div class="col-md-2">
                    <input
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
            <!--<pre>{{ $data }}</pre>-->
            <button type="submit" class="btn btn-outline-success mr-2"><i class="fas fa-save"></i> GRAVAR QUESTÃO</button>
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
    <pre>{{$data}}</pre>
  </section>
</template>

<script>
import { ADD_QUESTION } from "@/store/questions/question.constants";
import router from "@/router";
import HeaderPage from "@/components/HeaderPage.vue"
import { mapGetters } from "vuex";

export default {
  name: "AddQuestion",
   components: {
    HeaderPage
  },
  data: () => {
    return {
      title: "",
      group: "",
      type: "Escolha múltipla",
      question: "",
      description: "",
      level: "",
      active: true,
      answers: []
    };
  },
  computed: {
    ...mapGetters("question", ["getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`question/${ADD_QUESTION}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Questão adicionada!", "success");
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
      this.answers.push({ title: "", description:"", correct: false });
    },
    removeAnswer(index) {
      this.answers.splice(index, 1);
    },
  }
};
</script>