import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import wysiwyg from 'vue-wysiwyg';

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000',
});

Vue.use(wysiwyg, {
  maxWidth: '300px',
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
