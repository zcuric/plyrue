<template>
  <audio v-bind="attributes">
    <slot></slot>
    <source v-for="source in sources" :key="source.src" v-bind="source" />
  </audio>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PlyrueSource } from '../types';

defineOptions({ name: 'PlyrueAudio', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    sources?: PlyrueSource[];
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: string;
    src?: string;
  }>(),
  {
    sources: () => [],
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
    preload: 'none',
    src: undefined
  }
);

const attributes = computed(() => {
  const { sources: _sources, ...rest } = props;
  return rest;
});
</script>
