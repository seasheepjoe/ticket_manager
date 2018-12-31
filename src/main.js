import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';

const routes = [{ path: '/', component: Home, name: 'Home' }];
const router = new VueRouter({
  routes
});

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
