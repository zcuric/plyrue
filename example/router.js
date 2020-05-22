import AudioExample from './components/AudioExample';
import DefaultExample from './components/DefaultExample';
import Router from 'vue-router';
import VideoExample from './components/VideoExample';
import VideoSlotExample from './components/VideoSlotExample';
import VimeoExample from './components/VimeoExample';
import Vue from 'vue';
import YoutubeExample from './components/YoutubeExample';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Default Example',
      component: DefaultExample
    },
    {
      path: '/video',
      name: 'Video Example',
      component: VideoExample
    },
    {
      path: '/video-slot',
      name: 'Video Slot Example',
      component: VideoSlotExample
    },
    {
      path: '/vimeo',
      name: 'Vimeo',
      component: VimeoExample
    },
    {
      path: '/youtube',
      name: 'YouTube',
      component: YoutubeExample
    },
    {
      path: '/audio',
      name: 'Audio',
      component: AudioExample
    }
  ]
});
