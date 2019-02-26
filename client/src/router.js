import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/users/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/users/signup',
      name: 'signup',
      component: () => import ('@/views/Signup.vue'),
    },
    {
      path: '/questions/:id',
      name: 'questions',
      component: () => import ('@/views/Question.vue'),
    }
  ],
});
