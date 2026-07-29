import 'plyr/dist/plyr.css';
import './style.css';
import { createApp } from 'vue';
import Plyrue from '@/index';
import App from './App.vue';
import router from './router';

createApp(App).use(router).use(Plyrue).mount('#app');
