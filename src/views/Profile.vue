<template>
  <section class="page-section">
    <b-container>
      <b-card class="overflow-hidden mt-5" style="max-width: 1540px; ">
        <b-row>
          <b-col md="6" align="center">
            <b-card-img
              style="width:200px"
              :src="require(`@/assets/avatars/${this.getUserLevelByPoints(user.gamification.points).avatar}.png`)"
              class="rounded-0 mb-2"
            ></b-card-img>
            <br />
            <HeaderPage :title="user.name.toUpperCase()" />
            <h4 class="text-center">
              <small>
                {{user.gamification.points}}
                <i class="fas fa-piggy-bank fa-lg mr-3"></i>
              </small>
              <small>
                {{+user.gamification.quiz}}º
                <i class="fas fa-list-alt fa-lg mr-3"></i>
              </small>
              <small>
                7
                <i class="fas fa-star fa-lg mr-3"></i>
              </small>
              <small>
                14º
                <i class="fas fa-chart-line fa-lg mr-3"></i>
              </small>
              <small>
                7
                <i class="fas fa-comment fa-lg"></i>
              </small>
       
            </h4>
          </b-col>
          <b-col md="6">
            <b-card-body title="PERFIL" align="center">
              <b-card-text align="left">
                <h5>Dados pessoais</h5>
                <strong>Nome: </strong>{{user.name}}
                <br />
                <strong>Data de nascimento:</strong> {{setCurrentDateTime(user.birth_date)}}
                <br />
                <strong>Cidade:</strong> {{user.location.city}} | <strong>País:</strong> {{user.location.country}}
                <br>
                <strong>Descrição:</strong> {{user.description}}
                <br />
                <br />
                <h5>Conta</h5>                
                <strong>Data de registo:</strong> {{setCurrentDateTime(user.registration_date)}}
                <br />
                <strong>Username:</strong> {{user.auth.username}}
                <br />
                <strong>Tipo:</strong> {{user.type==='user'?'Utilizador normal':'Administrador'}}
                <br />
                <br/>
                <h5>Gamificação</h5>                
                <strong>Nível atual:</strong> {{this.getUserLevelByPoints(user.gamification.points).level}}º ({{this.getUserLevelByPoints(user.gamification.points).name}})
                <br />
                <strong>Pontos:</strong> {{user.gamification.points}}
                <br />
                <strong>Ranking:</strong> 14º
                <br />
                <strong>Último quiz completado com sucesso:</strong> {{+user.gamification.quiz}}º
                <br />
                <br/>
                
              </b-card-text>
              <br />
              <b-button variant="outline-success" class="mr-2 mt-2" @click="editProfileData()">
                <i class="fas fa-user-edit"></i> EDITAR PERFIL
              </b-button>
              <b-button variant="outline-warning" class="mr-2 mt-2" @click="showRanking()">
                <i class="fas fa-chart-line"></i> VER RANKING
              </b-button>
              <b-button variant="outline-danger" class="mr-2 mt-2" @click="logout()">
                <i class="fas fa-sign-out-alt"></i> LOGOUT
              </b-button>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </section>
</template>

<script>
import { AUTH_LOGOUT_SUCCESS } from "@/store/auth/auth.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
import router from "@/router";
export default {
  components: {
    HeaderPage
  },
  data: function() {
    return {
      avatar: {}
    };
  },
  computed: {
    ...mapGetters(["getUserLevelByPoints"]),
    ...mapGetters({ user: "auth/getProfile" })
  },
  methods: {
    logout() {
      this.$confirm(
        "Se sim, clique em OK",
        "Queres mesmo sair do Animalec?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.commit(`auth/${AUTH_LOGOUT_SUCCESS}`);
          router.push({ name: "home" });
        },
        () => {
          this.$alert("Estás de volta!", "Informação", "info");
        }
      );
    },
    setCurrentDateTime(paramDate) {
      const date = new Date(paramDate);
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay();
    },
    showRanking() {
      router.push({name: 'ranking'})
    },
    editProfileData() {
      router.push({name: 'editProfile'})
    }
  }
};
</script>
