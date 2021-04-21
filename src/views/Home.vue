<template>
  <b-container fluid>
    <!-- Header -->
        <header class="masthead bg-secondary text-white text-center">
    <b-row>
      <b-col>
    
          <img class="masthead-avatar mb-2" src="@/assets/animalec.png" />
          <p class="masthead-subheading font-weight-light">
            Aprender tudo sobre animais de uma forma divertida!
          </p>
      </b-col>
    </b-row>      
          <b-row>
            <b-col>
              <b-button
                variant="light"
                href="#rules"
                class="p-2 mr-2"
              >
                <i class="fas fa-info-circle mr-2"></i>COMO JOGAR?
              </b-button>
               <b-button
                variant="danger"                
                
                class="p-2 mr-2"
                @click="showRanking()"
              >
               <i class="fas fa-chart-line mr-2"></i>VER RANKING
              </b-button>
            </b-col>
          </b-row>
        </header>
      
    <!-- Rules section -->
    <section class="page-section bg-primary" id="rules">
      <b-container fluid>
        <h4
          class="page-section-heading text-center text-uppercase text-secondary mb-5"
        >
          REGRAS
        </h4>
        <b-row class="mt-5 mb-5">
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <i class="fas fa-hippo fa-3x" style="color:white"></i>
            <p>
              1 - Seleciona <strong>ANIMAIS</strong> e estuda tudo sobre os animais que tens disponíveis!
            </p>
          </b-col>
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <i class="fas fa-comment fa-3x" style="color:white"></i>
            <p>2 - Mostra quem são os teus animais preferidos e fala com os teus
            amigos sobre qualquer animal!
            </p>
          </b-col>
          <b-col cols="2"></b-col>
        </b-row>
        <b-row class="mb-5">
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <i class="fas fa-table fa-3x" style="color:white"></i>
            <p>3 - Quando te sentires preparado, seleciona <strong>QUIZZES </strong>e começa a
            jogar!
            </p>
          </b-col>
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <i class="fas fa-medal fa-3x" style="color:white"></i>
            <p>4 - À medida que fores avançando, ganhas pontos, desbloqueias
            novos animais e sobes no ranking dos maiores especialistas de animais
            do planeta!</p>
          </b-col>
          <b-col cols="2"></b-col>
        </b-row>

      </b-container>
    </section>
    <!-- Contact Section -->
    <section class="page-section" id="contacts">
      <div class="container">
        <!-- Contact Section Heading -->
        <h2
          class="page-section-heading text-center text-uppercase text-secondary mb-5"
        >
          CONTACTOS
        </h2>

        <!--FORM-->
        <form @submit.prevent="send">
          <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="8">
              <div class="form-group">
                <input
                  v-model="name"
                  type="text"
                  class="form-control form-control-lg"
                  id="txtName"
                  placeholder="escreve o teu nome"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  v-model="email"
                  type="email"
                  class="form-control form-control-lg"
                  id="txtName"
                  placeholder="escreve o teu e-mail"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  v-model="subject"
                  type="text"
                  class="form-control form-control-lg"
                  id="txtName"
                  placeholder="escreve o assunto"
                  required
                />
              </div>
              <div class="form-group">
                <textarea
                  id="txtDescription"
                  class="form-control form-control-lg"
                  placeholder="escreve a tua mensagem"
                  cols="30"
                  rows="10"
                  v-model="message"
                ></textarea>
              </div>
            </b-col>
            <b-col cols="2"></b-col>
          </b-row>
          <b-row>
            <b-col cols="2"></b-col>
            <b-col>
              <b-button
                type="submit"
                variant="success"
                
                class="p-2 mr-2"
              >
                <i class="fas fa-envelope-square mr-2"></i>ENVIAR
              </b-button>
              <b-button
                type="reset"
                variant="danger"
                
                class="p-2"
              >
                <i class="fas fa-eraser mr-2"></i>LIMPAR
              </b-button>
            </b-col>
            <b-col cols="2"></b-col>
          </b-row>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer text-center">
      <div class="container">
        <div class="row">
          <!-- Footer Location -->
          <div class="col-lg-4 mb-5 mb-lg-0">
            <h4 class="text-uppercase mb-4">Criadores</h4>
            <p class="lead mb-0">
              <a href="mailto:ricardo.queiros@gmail.com" target="_blank"
                >Ricardo Queirós</a
              >
              <br /><a href="mailto:filipeportela@iotech.pt" target="_blank"
                >Filipe Portela</a
              >
            </p>
          </div>

          <!-- Footer Social Icons -->
          <div class="col-lg-4 mb-5 mb-lg-0">
            <h4 class="text-uppercase mb-4">PRESENÇA DIGITAL</h4>
            <a class="btn btn-outline-light btn-social mx-1" href="#">
              <i class="fab fa-fw fa-facebook-f"></i>
            </a>
            <a class="btn btn-outline-light btn-social mx-1" href="#">
              <i class="fab fa-fw fa-twitter"></i>
            </a>
            <a class="btn btn-outline-light btn-social mx-1" href="#">
              <i class="fab fa-fw fa-linkedin-in"></i>
            </a>
            <a class="btn btn-outline-light btn-social mx-1" href="#">
              <i class="fab fa-fw fa-dribbble"></i>
            </a>
          </div>

          <!-- Footer About Text -->
          <div class="col-lg-4">
            <h4 class="text-uppercase mb-4">Sobre o Animalec</h4>
            <p class="lead mb-0">
              Animalec usa tema de Bootstrap com licença MIT, gratuito e criado
              por
              <a href="http://startbootstrap.com" target="_blank"
                >StartBootstrap</a
              >.
            </p>
          </div>
        </div>
      </div>
    </footer>

    <!-- Copyright Section -->
    <section class="copyright py-4 text-center text-white">
      <div class="container">
        <small>Copyright &copy; ANIMALEC 2020</small>
      </div>
    </section>

    <!-- Scroll to Top Button (Only visible on small and extra-small screen sizes) -->
    <div class="scroll-to-top d-lg-none position-fixed">
      <a
        class="js-scroll-trigger d-block text-center text-white rounded"
        href="#page-top"
      >
        <i class="fa fa-chevron-up"></i>
      </a>
    </div>
  </b-container>
</template>

<script>
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import { FETCH_USERS } from "@/store/users/user.constants";
import { SEND_EMAIL } from "@/store/constants";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data: function() {
    return {
      name: "ricardo",
      email: "ricardo.queiros@gmail.com",
      subject: "teste",
      message: "isto é um teste!"
    };
  },
  computed: {
    ...mapGetters(["getMessage", "auth/isUserLoggedIn"])
  },
  methods: {
    showRanking() {
      router.push({ name: "ranking" });
    },
    send() {
      this.$store
        .dispatch(`${SEND_EMAIL}`, this.$data)
        .then(
          () => this.$alert(this.getMessage, "E-mail enviado!", "success"),
          err => this.$alert(`${err.message}`, "Erro", "error")
        );
    }
  },
  created() {
    if (this.isUserLoggedIn) {
      this.$store.dispatch(`animal/${FETCH_ANIMALS}`);
      this.$store.dispatch(`user/${FETCH_USERS}`);
    }
  }
};
</script>
