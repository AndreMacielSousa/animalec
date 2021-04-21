import animalService from "@/api/animal.service";
import { 
  // Actions
  FETCH_ANIMALS, 
  ADD_ANIMAL, 
  EDIT_ANIMAL, 
  REMOVE_ANIMAL, 
  // Mutations
  SET_ANIMALS, 
  SET_MESSAGE,
  UPDATE_LIKES 
} from "./animal.constants";

const state = {
  animals: []
};

const getters = {
  getAnimals: state => state.animals,
  getAnimalsById: state => id => state.animals.find(animal => animal._id === id),
  getMessage: state => state.message,
  
};

const actions = {
  [FETCH_ANIMALS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      animalService.getAnimals(rootState.auth.token)
        .then(
          res => {
            commit(SET_ANIMALS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    })
  },
  [ADD_ANIMAL]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      animalService.addAnimal(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O animal ${res.body.name} foi adicionado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    });
  },
  [EDIT_ANIMAL]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      animalService.editAnimal(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O animal ${res.body.name} foi atualizado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err)
            reject(err)
          });
    });
  },
  [REMOVE_ANIMAL]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      animalService.removeAnimal(rootState.auth.token, id)
        .then(res => {
          commit(SET_MESSAGE, `O animal foi removido com sucesso!`);
          resolve(res)
        }, err => {
          commit(SET_MESSAGE, err.message)
          reject(err)
        });
    });
  }
};

export const mutations = {
  [SET_ANIMALS]: (state, animals) => {
    state.animals = animals;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  },
  [UPDATE_LIKES]: (state, payload) => {
    state.animals.forEach(animal => {
      if(animal._id === payload.animalId) {
        animal.evaluation.push(payload.userId)
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}