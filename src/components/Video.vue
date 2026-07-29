<template>
  <video v-bind="attributes">
    <slot></slot>
    <source v-for="source in sources" :key="source.src" v-bind="source" />
    <track
      v-for="caption in captions"
      :key="caption.src"
      v-bind="caption"
      kind="captions"
      default
    />
  </video>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PlyrueCaption, PlyrueSource } from '../types';

defineOptions({ name: 'PlyrueVideo', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    sources?: PlyrueSource[];
    captions?: PlyrueCaption[];
    autoplay?: boolean;
    crossorigin?: string;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: string;
    playsinline?: boolean;
    poster?: string;
    src?: string;
  }>(),
  {
    sources: () => [],
    captions: () => [],
    autoplay: false,
    crossorigin: undefined,
    controls: true,
    loop: false,
    muted: false,
    preload: 'none',
    playsinline: false,
    poster: undefined,
    src: undefined
  }
);

const attributes = computed(() => {
  const { sources: _sources, captions: _captions, ...rest } = props;
  return rest;
});
</script>
