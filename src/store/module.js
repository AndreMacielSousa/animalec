import emailService from "@/api/email.service";
import { 
  // Actions  
  SEND_EMAIL,
  // Mutations
  SET_MESSAGE 
} from "./constants";

const state = {
  message:"",
  userLevels: [
    { level: 1, name: "iniciante", avatar: "sapo", max: 100 },
    { level: 2, name: "aprendiz", avatar: "macaco", max: 200 },
    { level: 3, name: "junior", avatar: "cao", max: 300 },
    { level: 4, name: "especialista", avatar: "tigre", max: 400 },
    { level: 5, name: "mestre", avatar: "leao", max: Number.MAX_SAFE_INTEGER }
  ]
};

const getters = {
  getUserLevelByPoints: state => points => {
    return state.userLevels.find(userLevel => points <= userLevel.max)
  }
};

const actions = {
  [SEND_EMAIL]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      emailService.sendEmail(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, "sucesso!");
            resolve(res) 
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
};

export const mutations = {
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}