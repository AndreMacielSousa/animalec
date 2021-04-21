import userService from "@/api/user.service";
import {
  SET_USERS,
  SET_MESSAGE,
  FETCH_USERS,
  ADD_USER,
  EDIT_USER,
  REMOVE_USER
} from "./user.constants";

const state = {
  users: [],
  message: ""
};

const getters = {
  getUsers: state => state.users,
  getUsersById: state => id => state.users.find(user => user._id === id),
  getNameById: state => id => {
    const user = state.users.find(user => user._id === id);
    return user.name;
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_USERS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      userService.getUsers(rootState.auth.token).then(
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
      userService.addUser(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O utilizador ${res.body.name} foi adicionado com sucesso!`
          );
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [EDIT_USER]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      userService.editUser(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O utilizador ${res.body.name} foi atualizado com sucesso!`
          );
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [REMOVE_USER]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      userService.removeUser(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `O utilizador foi removido com sucesso!`);
          resolve(res);
        },
        err => reject(err)
      );
    });
  }
};

export const mutations = {
  [SET_USERS]: (state, users) => {
    state.users = users;
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
