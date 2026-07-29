import { createRouter, createWebHashHistory } from 'vue-router';
import AudioExample from './components/AudioExample.vue';
import DefaultExample from './components/DefaultExample.vue';
import EventsExample from './components/EventsExample.vue';
import VideoExample from './components/VideoExample.vue';
import VideoSlotExample from './components/VideoSlotExample.vue';
import VimeoExample from './components/VimeoExample.vue';
import YoutubeExample from './components/YoutubeExample.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'Default', component: DefaultExample },
    { path: '/audio', name: 'Audio', component: AudioExample },
    { path: '/video', name: 'Video', component: VideoExample },
    { path: '/video-slot', name: 'Video slot', component: VideoSlotExample },
    { path: '/youtube', name: 'YouTube', component: YoutubeExample },
    { path: '/vimeo', name: 'Vimeo', component: VimeoExample },
    { path: '/events', name: 'Events', component: EventsExample }
  ]
});
