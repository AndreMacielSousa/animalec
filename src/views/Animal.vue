<template>
  <section class="page-section">
    <b-container>
      <HeaderPage :title="animal.name" />
      <b-row>
        <b-col>
          <b-card class="overflow-hidden" style="max-width: 1540px; ">
            <b-row>
              <b-col md="6" align="center">
                <b-card-img :src="animal.links[0].url" class="rounded-0 mb-2"></b-card-img>
                <br />
                <b-button variant="danger" class="mr-2" @click="setComment()">
                  <i class="fas fa-arrow-alt-circle-left"></i>
                </b-button>&nbsp;1 de 3&nbsp;
                <b-button variant="danger" class="mr-2" @click="setComment()">
                  <i class="fas fa-arrow-alt-circle-right"></i>
                </b-button>
              </b-col>
              <b-col md="6">
                <b-card-body :title="animal.name + ' (' + animal.group + ')'">
                  <b-card-text align="left">
                    <!-- Level -->
                    <i class="fas fa-medal fa-lg ml-2"></i>
                    {{animal.level}}
                    <!-- Evaluation -->
                    <i class="fas fa-star fa-lg ml-2"></i>
                    {{animal.evaluation.length}}
                    <!-- Comments -->
                    <i class="fas fa-comment fa-lg ml-2" @click="showComments()"></i>
                    {{animal.comments.length}}
                    <!-- Ranking -->
                    <i class="fas fa-clipboard-list fa-lg ml-2"></i>
                    3
                  </b-card-text>
                  <b-card-text>
                    <b>Descrição:</b>
                    {{animal.description}}
                  </b-card-text>
                  <b-card-text>
                    <b>Comentários:</b>
                    <b-alert
                      show
                      variant="secondary"
                      v-for="comment in this.animal.comments"
                      :key="comment._id"
                    >
                      <b>{{comment.user.name}}</b>
                      ({{setCurrentDateTime(comment.date)}})
                      <br />
                      {{comment.body}}
                    </b-alert>
                  </b-card-text>
                  <b-card-text>
                    <b>Comentário:</b>
                    <div class="form-group">
                      <textarea
                        id="txtDescription"
                        class="form-control"
                        placeholder="escreve descrição"
                        cols="30"
                        rows="3"
                        v-model="comment"
                        required
                      ></textarea>
                      <br />
                      <b-button variant="danger" class="mr-2" @click="setComment()">
                        <i class="fas fa-comments"></i> COMENTAR
                      </b-button>
                      <b-button
                        variant="outline-success"
                        class="mr-2"
                        @click="showVideo(animal.links[1].url)"
                      >
                        <i class="fas fa-video"></i> VER VÍDEO
                      </b-button>

                      <router-link
                        :to="{name: 'animals'}"
                        tag="b-button"
                        variant="outline-danger"
                        align="center"
                        class="mr-2"
                      >
                        <i class="fas fa-arrow-alt-circle-left"></i> VOLTAR
                      </router-link>
                    </div>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { EDIT_ANIMAL } from "@/store/animals/animal.constants";
import { mapGetters } from "vuex";
export default {
  name: "Animal",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      animal: "",
      comment: ""
    };
  },
  computed: {
    ...mapGetters("animal", ["getAnimalsById", "getMessage"]),
    ...mapGetters("auth", ["getProfile"]),
    ...mapGetters("user", ["getUsersById","getNameById"]),
    ...mapGetters(["getUserLevelByPoints"])
  },
  methods: {
    showVideo(videoUrl) {
      this.$fire({
        title: "<strong>Vídeo</strong>",
        icon: "info",
        html: `
          <iframe width='460' height='315' 
            src='${videoUrl}' frameborder='0' 
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen></iframe> 
          `,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK'
      });
    },
    showComments() {
      this.$fire({
        title: "<strong>Comentários</strong>",
        icon: "info",
        html: this.generateComments(),
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK'
      });
    },
    generateComments() {
      let comments = "";
      for (let comment of this.animal.comments) {
        comments += `
        <b-alert show variant="secondary">
          
          
          <b>${comment.user.name}</b> (${comment.date})<br>
          ${comment.body}  
        </b-alert>
        <br><br>
          `;
      }
      return comments;
    },
    setComment() {
      this.animal.comments.push({
        body: this.comment,
        user: this.getProfile._id,
        date: this.getCurrentDateTime()
      });
      this.$store.dispatch(`animal/${EDIT_ANIMAL}`, this.animal).then(
        () => {
          this.$alert(`Obrigado pelo comentário!`, "Comentários", "success");
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    getCurrentDateTime() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDay();
      const time = today.getHours() + ":" + today.getMinutes();
      return `${date} ${time}`;
    },
    setCurrentDateTime(commentDate) {
      const date = new Date(commentDate);
      const formatDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay();
      const formatTime = date.getHours() + ":" + date.getMinutes();
      return `${formatDate} ${formatTime}`;
    }
  },
  created() {
    this.animal = this.getAnimalsById(this.$route.params.animalId);
  }
};
</script>
