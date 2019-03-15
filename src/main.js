import Vue from 'vue'
import App from './App.vue'
import Plyrvue from '.';

Vue.config.productionTip = false
Vue.use(Plyrvue);

new Vue({
  render: h => h(App),
}).$mount('#app')
