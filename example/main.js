import App from './App.vue';
import Plyrue from '../src/index';
import router from './router';
import Vue from 'vue';

Vue.config.productionTip = false;
Vue.use(Plyrue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
