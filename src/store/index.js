/* eslint-disable */

import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_TOKEN: localStorage.getItem('apiToken') || null,
    USERNAME: localStorage.getItem('username') || null,
    IS_ADMIN: localStorage.getItem('isAdmin') || false
  },
  mutations: {
    setApiToken(state, apiToken) {
      state.API_TOKEN = apiToken;
      localStorage.setItem('apiToken', apiToken);
    },
    setUser(state, user) {
      state.USERNAME = user;
      state.IS_ADMIN = user.is_admin;
      localStorage.setItem('username', user.fullname);
      localStorage.setItem('isAdmin', user.is_admin);
    }
  },
  actions: {
    setApiToken(context, apiToken) {
      context.commit('setApiToken', apiToken);
    },
    setUser(context, user) {
      context.commit('setUser', user);
    }
  }
});
