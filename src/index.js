import Plyrue from './components/Plyrue.vue';
import 'plyr/dist/plyr.css';

const PlyruePlugin = {
  install(Vue, options = {}) {
    const name = options.name || Plyrue.name;
    Vue.component(name, Plyrue);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(PlyruePlugin);
}

export default PlyruePlugin;
export { Plyrue as PlyrueComponent, PlyruePlugin };
