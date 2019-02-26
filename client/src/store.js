import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  mutations: {
    userStatus(state, payload) {
      state.isLogin = payload;
    },
  },
  actions: {
    checkUser({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/users/auth',
        headers: { token: localStorage.getItem('token') }
      })
        .then(() => {
          // console.log(response, '=====>');
          commit('userStatus', true);
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
});
