import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router/index';
import fr from './fr.js';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(VueI18n);
Vue.config.productionTip = false;

export const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: fr
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
