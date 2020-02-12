import Vue from 'vue';
import 'normalize.css/normalize.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/main.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
