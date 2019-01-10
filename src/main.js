import Vue from 'vue';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router/index';
import fr from './fr';
import store from './store/index';

Vue.use(BootstrapVue);
Vue.use(VueI18n);
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: fr,
});

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');
