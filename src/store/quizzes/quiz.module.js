import quizService from "@/api/quiz.service";
import { 
  // Actions
  FETCH_QUIZZES,
  ADD_QUIZ,
  EDIT_QUIZ,
  REMOVE_QUIZ,
  // Mutations 
  SET_QUIZZES,
  SET_MESSAGE 
} from "./quiz.constants";

const state = {
  quizzes: [],
  message: ""
};

const getters = {
  getQuizzes: state => state.quizzes,
  getQuizById: state => id => {
    return state.quizzes.find(quiz => quiz._id === id)
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_QUIZZES]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      quizService.getQuizzes(rootState.auth.token)
        .then(
          res => {
            commit(SET_QUIZZES, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
  [ADD_QUIZ]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      quizService.addQuiz(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, "sucesso!");
            resolve(res.body) 
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
  [EDIT_QUIZ]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      quizService.editQuiz(rootState.auth.token, payload)
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
  [REMOVE_QUIZ]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      quizService.removeQuiz(rootState.auth.token, id)
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
    }
  };

export const mutations = {
  [SET_QUIZZES]: (state, quizzes) => {
    state.quizzes = quizzes;
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
}