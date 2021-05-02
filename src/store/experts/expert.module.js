import userService from "@/api/user.service";    // TODO Aleterar depois de API
import {
  SET_EXPERTS,
  SET_MESSAGE,
  FETCH_EXPERTS,
  ADD_EXPERT,
  EDIT_EXPERT,
  REMOVE_EXPERT
} from "./expert.constants";

const state = {
  experts: [],
  message: ""
};

const getters = {
  getExperts: state => state.experts,
  getExpertsById: state => id => state.experts.find(expert => expert._id === id),
  getNameById: state => id => {
    const expert = state.experts.find(expert => expert._id === id);
    return expert.name;
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_USERS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      expertService.getExperts(rootState.auth.token).then(
        res => {
          commit(SET_USERS, res.body);
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [ADD_USER]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      expertService.addExpert(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O expert ${res.body.name} foi adicionado com sucesso!`
          );
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [EDIT_USER]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      expertService.editExpert(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O expert ${res.body.name} foi atualizado com sucesso!`
          );
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [REMOVE_USER]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      expertService.removeExpert(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `O expert foi removido com sucesso!`);
          resolve(res);
        },
        err => reject(err)
      );
    });
  }
};

export const mutations = {
  [SET_USERS]: (state, experts) => {
    state.experts = experts;
  },
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
};
