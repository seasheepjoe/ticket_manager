/* eslint-disable */

import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_TOKEN: localStorage.getItem('apiToken') || null,
    USERNAME: localStorage.getItem('username') || null
  },
  mutations: {
    setApiToken(state, apiToken) {
      state.API_TOKEN = apiToken;
      localStorage.setItem('apiToken', apiToken);
    },
    setUser(state, user) {
      state.USERNAME = user;
      Vue.set(state, 'IS_ADMIN', user.is_admin);
      localStorage.setItem('username', user.fullname);
    },
    logout(state) {
      (state.USERNAME = null),
        (state.API_TOKEN = null),
        Vue.delete(state, 'IS_ADMIN');
      localStorage.removeItem('apiToken');
      localStorage.removeItem('username');
    }
  },
  actions: {
    setApiToken(context, apiToken) {
      context.commit('setApiToken', apiToken);
    },
    setUser(context, user) {
      context.commit('setUser', user);
    },
    logout(context) {
      context.commit('logout');
    }
  }
});
