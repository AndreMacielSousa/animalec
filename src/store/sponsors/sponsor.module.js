import userService from "@/api/user.service";   // TODO Aleterar depois de API
import {
  SET_SPONSORS,
  SET_MESSAGE,
  FETCH_SPONSORS,
  ADD_SPONSOR,
  EDIT_SPONSOR,
  SPONSOR
} from "./sponsor.constants";

const state = {
  sponsors: [],
  message: ""
};

const getters = {
  getSponsors: state => state.sponsors,
  getSponsorsById: state => id => state.sponsors.find(sponsor => sponsor._id === id),
  getNameById: state => id => {
    const sponsor = state.sponsors.find(sponsor => sponsor._id === id);
    return sponsor.name;
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_SPONSORS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      sponsorService.getSponsors(rootState.auth.token).then(
        res => {
          commit(SET_SPONSORS, res.body);
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [ADD_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorService.addSponsor(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O sponsor ${res.body.name} foi adicionado com sucesso!`
          );
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [EDIT_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorService.editSponsor(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O sponsor ${res.body.name} foi atualizado com sucesso!`
          );
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [REMOVE_SPONSOR]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      sponsorService.removeSponsor(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `O sponsor foi removido com sucesso!`);
          resolve(res);
        },
        err => reject(err)
      );
    });
  }
};

export const mutations = {
  [SET_SPONSORS]: (state, sponsors) => {
    state.sponsors = sponsors;
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
