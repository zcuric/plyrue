import Vue from 'vue'
import Plyrue from '../src/index';
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Plyrue, {
  config: {
    autoplay: true
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
