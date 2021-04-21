import questionService from "@/api/question.service";
import { 
  // Actions
  FETCH_QUESTIONS,
  ADD_QUESTION,
  EDIT_QUESTION,
  REMOVE_QUESTION,
  // Mutations 
  SET_QUESTIONS,
  SET_MESSAGE 
} from "./question.constants";

const state = {
  questions: [],
  message: ""
};

const getters = {
  getQuestions: state => state.questions,
  getQuestionById: state => id => {
    return state.questions.find(question => question._id === id)
  },
  getQuestionsByLevel: state => level => {
    return state.questions.filter(question => question.level === level)
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_QUESTIONS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      questionService.getQuestions(rootState.auth.token)
        .then(
          res => {
            commit(SET_QUESTIONS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          }
        );
    });
  },
  [ADD_QUESTION]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      questionService.addQuestion(rootState.auth.token, payload)
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
  [EDIT_QUESTION]: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      questionService.editQuestion(rootState.auth.token, payload)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  },
  [REMOVE_QUESTION]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      questionService.removeQuestion(rootState.auth.token, id)
        .then(
          res => {
            commit(SET_MESSAGE, "sucesso!");
            resolve(res)
          },
          err => reject(err)
        );
    });
  }
};

export const mutations = {
  [SET_QUESTIONS]: (state, questions) => {
    state.questions = questions;
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