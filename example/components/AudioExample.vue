<template>
  <plyrue type="audio" :sources="sources" />
</template>

<script setup lang="ts">
import type { PlyrueSource } from '@/types';

const CDN = 'https://cdn.plyr.io/static/demo';

const sources: PlyrueSource[] = [
  {
    src: `${CDN}/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3`,
    type: 'audio/mp3'
  },
  {
    src: `${CDN}/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg`,
    type: 'audio/ogg'
  }
];
</script>
