import Vue from 'vue';
import axios from 'axios';
import wysiwyg from 'vue-wysiwyg';
import VueAlertify from 'vue-alertify';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000',
});

Vue.use(wysiwyg, {
  maxWidth: '300px',
});
Vue.use(VueAlertify);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
