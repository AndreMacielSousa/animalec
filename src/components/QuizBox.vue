<template>
  <b-col cols="3">
    <b-card bg-variant="secondary" text-variant="white" class="text-center mb-3">
        <h1 style="color: white">{{index}}</h1>
        <h6>{{title}}</h6>
        <div v-if="+user.gamification.quiz >= index">
          <i class="fas fa-check-square fa-3x" style="color: white"></i>
        </div>
        <div v-else-if="(+user.gamification.quiz + 1) == index">          
          <i class="fas fa-newspaper fa-3x" style="color: green" @click="startQuiz()"></i>
        </div>
        <div v-else>
          <i class="fas fa-lock fa-3x" style="color: orange"></i>
        </div>
      
    </b-card>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "AdminOptionBox",
  props: ["idQuiz", "index", "title"],
  computed: {
    ...mapGetters({ user: "auth/getProfile" })
  },
  methods: {
    startQuiz() {
      router.push({ name: "quiz", params: { quizId: this.idQuiz } });
    }
  }
};
</script>
