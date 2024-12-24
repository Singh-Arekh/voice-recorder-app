import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './views/HomePage.vue';
import AudioRecording from './views/AudioRecording.vue';

const routes = [
  { path: '/', component: Homepage },
  { path: '/audio-recording', component: AudioRecording },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
