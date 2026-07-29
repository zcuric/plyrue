import type { App, Plugin } from 'vue';
import Plyrue from './components/Plyrue.vue';
import type { PlyruePluginOptions } from './types';

export const PlyruePlugin: Plugin = {
  install(app: App, options: PlyruePluginOptions = {}) {
    app.component(options.name ?? 'plyrue', Plyrue);
  }
};

export { Plyrue as PlyrueComponent, Plyrue };
export { PLYR_EVENTS } from './events';
export type {
  PlyrPlayer,
  PlyrueCaption,
  PlyruePluginOptions,
  PlyrueSource,
  PlyrueType
} from './types';
export type { PlyrEvent } from './events';

export default PlyruePlugin;
