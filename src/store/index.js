import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_TOKEN: localStorage.getItem('apiToken') || null,
    USER_DATA: localStorage.getItem('user') || null
  },
  mutations: {
    setApiToken(state, apiToken) {
      state.API_TOKEN = apiToken;
      localStorage.setItem('apiToken', apiToken);
    },
    setUser(state, user) {
      state.USER_DATA = user;
      localStorage.setItem('user', user);
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
