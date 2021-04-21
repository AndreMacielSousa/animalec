<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" class="ml-5">
        <router-link
          :to="{ name: 'home' }"
          tag="img"
          :src="require('@/assets/animalec_line.png')"
          style="width:250px; height:50px"
          title="Página principal do Animalec"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-5">
          <b-nav-item :to="{ name: 'animals' }" :disabled="!isUserLoggedIn"
            >ANIMAIS</b-nav-item
          >
          <b-nav-item :to="{ name: 'quizzes' }" :disabled="!isUserLoggedIn"
            >QUIZZES</b-nav-item
          >
          <b-nav-item to="#contacts">CONTACTOS</b-nav-item>
          <div v-if="isUserLoggedIn">
            <div v-if="getUserType === 'user'">
              <b-nav-item :to="{ name: 'profile' }">
                <img
                  class="avatar"
                  :src="
                    require(`@/assets/avatars/${
                      this.getUserLevelByPoints(
                        this.getProfile.gamification.points
                      ).avatar
                    }.png`)
                  "
                  :title="getProfileName"
                />
              </b-nav-item>
            </div>
            <!-- alterar para aceder modulo admin -->
            <div v-else>
              <b-nav-item :to="{ name: 'admin' }">ADMIN</b-nav-item>
            </div>
          </div>
          <div v-else>
            <b-nav-item :to="{ name: 'login' }">LOGIN</b-nav-item>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUserLevelByPoints"]),
    ...mapGetters("auth", [
      "isUserLoggedIn",
      "getProfileName",
      "getUserType",
      "getProfile"
    ])
  }
};
</script>
