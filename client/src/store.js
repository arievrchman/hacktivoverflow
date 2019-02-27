import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    currentUserId: '',
    listQuestions: [],
    listAnswers: [],
  },
  mutations: {
    userStatus(state, payload) {
      state.isLogin = payload;
    },
    whoami(state, payload) {
      state.currentUserId = payload;
    },
    getAllQuestions(state, payload) {
      state.listQuestions = payload;
    },
    getAllAnswers(state, payload) {
      state.listAnswers = payload;
    },
  },

  actions: {
    checkUser({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/users/auth',
        headers: { token: localStorage.getItem('token') },
      })
        .then((response) => {
          // console.log(response, '=====>');
          const user = response.data.data._id;
          commit('userStatus', true);
          commit('whoami', user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllQuestions({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/questions',
      })
        .then(({ data }) => {
          // console.log(data.data);
          commit('getAllQuestions', data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllAnswers({ commit }, payload) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/answer/p/${payload}`,
      })
        .then((answers) => {
        // console.log(answers.data);
          commit('getAllAnswers', answers.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
