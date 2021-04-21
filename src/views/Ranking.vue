<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Ranking" />
      <!-- Top Menu -->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <b-button class="btn btn-info mr-2 p-2" @click="goBack()">
            <i class="fas fa-arrow-circle-left"></i> VOLTAR À PÁGINA ANTERIOR
          </b-button>          
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <!-- Table -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">POSIÇÃO</th>
                <th scope="col">NOME</th>
                <th scope="col">NÍVEL</th>
                <th scope="col">PONTOS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="user.name">
                <td class="pt-4">{{ index + 1 }}º</td>
                <td class="pt-4">{{ user.name }}</td>
                <td class="pt-4">
                  {{ getUserLevelByPoints(user.gamification.points).name }}
                </td>
                <td class="pt-4">{{ user.gamification.points }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_USERS } from "@/store/users/user.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "Ranking",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      users: []
    };
  },
  computed: {
    ...mapGetters(["getUserLevelByPoints"]),
    ...mapGetters("user", ["getUsers"])
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    fetchUsers() {
      this.$store.dispatch(`user/${FETCH_USERS}`).then(
        () => {
          this.users = this.getUsers;
          this.users.sort(this.comparePoints);
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    comparePoints(u1, u2) {
      if (u1.gamification.points > u2.gamification.points) return -1;
      if (u1.gamification.points < u2.gamification.points) return 1;
      else return 0;
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>
