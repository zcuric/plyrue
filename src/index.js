import Plyrue from "./components/Plyrue.vue";
import 'plyr/dist/plyr.css';

const PlyruePlugin = {
  install(vue) {   
    vue.component(Plyrue.name, Plyrue);
  }
}


if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(PlyruePlugin)
}

export {
  Plyrue,
  PlyruePlugin
}

export default {
  PlyruePlugin
}