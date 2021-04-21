<template>
  <b-container fluid>
    <!-- Header -->
    <header class="masthead bg-secondary text-white text-center">
      <img class="masthead-avatar mb-2" src="@/assets/animalec.png" />
      <b-row class="mt-5 mb-5">
        <b-col cols="2"></b-col>
        <b-col class="text-center">
          <i class="fas fa-hippo fa-3x"></i>
          <br />
          <kbd>Regra #01</kbd>
          <br />Seleciona ANIMAIS e estuda tudo sobre os animais que tens disponíveis!
        </b-col>
        <b-col cols="2"></b-col>
        <b-col class="text-center">
          <i class="fas fa-comment fa-3x"></i>
          <br />
          <kbd>Regra #02</kbd>
          <br />Mostra quem são os teus animias preferidos e fala com os teus amigos sobre qualque animal!
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row class="mb-5">
        <b-col cols="2"></b-col>
        <b-col class="text-center">
          <i class="fas fa-table fa-3x"></i>
          <br />
          <kbd>Regra #03</kbd>
          <br />Quando te sentires preparado, seleciona QUIZZES e começa a jogar!
        </b-col>
        <b-col cols="2"></b-col>
        <b-col class="text-center">
          <i class="fas fa-medal fa-3x"></i>
          <br />
          <kbd>Regra #04</kbd>
          <br />À medida que fores avançando, ganhas pontos, desbloqueias novos animais e sobes no ranking dos maiores especialista de animais do planeta!
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-button variant="outline-light" size="lg" class="p-2 mr-2" @click="showMain()">
            <i class="fas fa-home mr-2"></i>PÁGINA PRINCIPAL
          </b-button>
        </b-col>
      </b-row>
    </header>
  </b-container>
</template>

<script>
import router from "@/router";
export default {
  name: "Help",

  methods: {
    showMain() {
      router.push({ name: "home" });
    }
  }
};
</script>