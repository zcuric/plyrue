<template>
  <plyrue
    type="video"
    src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
    poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
    @player="onPlayer"
    @play="log('play')"
    @pause="log('pause')"
    @ended="log('ended')"
    @volumechange="log('volumechange')"
    @ready="log('ready')"
  />
  <div class="w-full max-w-2xl">
    <h2 class="mb-2 text-sm font-semibold tracking-wide uppercase">
      Event log
    </h2>
    <ul
      class="h-40 overflow-y-auto rounded border border-slate-200 bg-white p-3 font-mono text-xs"
    >
      <li v-for="(entry, index) in events" :key="index">{{ entry }}</li>
      <li v-if="!events.length" class="text-slate-400">
        Interact with the player…
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PlyrPlayer } from '@/types';

const events = ref<string[]>([]);

const log = (name: string) => events.value.unshift(name);
const onPlayer = (player: PlyrPlayer) => {
  events.value.unshift(`player created (${player.provider})`);
};
</script>
