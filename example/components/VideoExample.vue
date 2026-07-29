<template>
  <plyrue
    type="video"
    poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
    src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
    :options="options"
    :sources="sources"
    :captions="captions"
  />
</template>

<script setup lang="ts">
import type { PlyrueCaption, PlyrueSource } from '@/types';

const CDN = 'https://cdn.plyr.io/static/demo';

const options = {
  controls: ['play', 'progress', 'current-time', 'volume', 'settings']
};

const sources: PlyrueSource[] = [
  {
    src: `${CDN}/View_From_A_Blue_Moon_Trailer-576p.mp4`,
    type: 'video/mp4',
    size: 576
  },
  {
    src: `${CDN}/View_From_A_Blue_Moon_Trailer-720p.mp4`,
    type: 'video/mp4',
    size: 720
  },
  {
    src: `${CDN}/View_From_A_Blue_Moon_Trailer-1080p.mp4`,
    type: 'video/mp4',
    size: 1080
  }
];

const captions: PlyrueCaption[] = [
  {
    label: 'Français',
    srclang: 'fr',
    src: `${CDN}/View_From_A_Blue_Moon_Trailer-HD.fr.vtt`
  }
];
</script>
