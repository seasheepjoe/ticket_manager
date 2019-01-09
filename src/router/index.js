import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import TicketDetails from '@/components/TicketDetails.vue';
import NewTicket from '@/components/NewTicket.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register/',
      name: 'Register',
      component: Register,
    },
    {
      path: '/tickets/:id/',
      name: 'TicketDetails',
      component: TicketDetails,
    },
    {
      path: '/new/',
      name: 'New Ticket',
      component: NewTicket,
    },
  ],
});
