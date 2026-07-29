<template>
  <div class="plyr__video-embed">
    <iframe
      :src="source"
      allowfullscreen
      allowtransparency
      allow="autoplay"
      v-bind="$attrs"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'PlyrueVideoEmbed', inheritAttrs: false });

const props = withDefaults(defineProps<{ src?: string }>(), {
  src: undefined
});

const YOUTUBE_WATCH = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/;
const ALLOWED_PROTOCOLS = ['http:', 'https:'];

/**
 * Normalizes the given url into something an iframe can actually load, and
 * refuses anything that is not plain http(s) so a `javascript:` or `data:`
 * url can never end up as an iframe source.
 */
const source = computed(() => {
  const { src } = props;
  if (!src) return undefined;
  let url: URL;
  try {
    url = new URL(src, 'http://localhost');
  } catch {
    return undefined;
  }
  if (!ALLOWED_PROTOCOLS.includes(url.protocol)) return undefined;
  /**
   * Converts a YouTube watch url to its embed form, which fixes the
   * `Refused to display 'src' in a frame because it set 'X-Frame-Options'
   * to 'SAMEORIGIN'` error.
   */
  if (YOUTUBE_WATCH.test(src)) {
    return `https://www.youtube.com/embed/${url.searchParams.get('v') ?? ''}`;
  }
  return src;
});
</script>
