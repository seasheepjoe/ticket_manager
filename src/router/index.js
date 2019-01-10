import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import TicketDetails from '@/components/TicketDetails.vue';
import NewTicket from '@/components/NewTicket.vue';
import api from '../config/ApiConfig';
import store from '../store/index';

/* eslint-disable */

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register/',
      name: 'Register',
      component: Register
    },
    {
      path: '/tickets/:id/',
      name: 'TicketDetails',
      component: TicketDetails
    },
    {
      path: '/new/',
      name: 'New Ticket',
      component: NewTicket
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' || to.name !== 'Register') {
    api
      .get('http://api.ticketmanager.com/auth/check')
      .then(response => {
        const { data } = response;
        switch (data.status) {
          case 'success':
            store.dispatch('setApiToken', data.user.apiToken);
            store.dispatch('setUser', data.user);
            next();
            break;
          case 'error':
            next({ name: 'Login' });
            break;
          default:
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  next();
});

export default router;
