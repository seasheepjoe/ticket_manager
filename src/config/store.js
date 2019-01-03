import Vuex from 'vuex';
export default new Vuex.Store({
  state: {
    API_TOKEN: localStorage.getItem('apiToken') || null
  }
});
