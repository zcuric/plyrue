<template>
  <div class="plyr__video-embed">
    <iframe :src="source" v-bind="$attrs"/>
  </div>
</template>

<script>

const YOUTUBE_VIDEO = `https://www.youtube.com/watch?v=`;
const YOUTUBE_EMBED = `https://www.youtube.com/embed/`;

export default {
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      default: null
    }
  },
  computed: {
    source() {
      const { src } = this;
      // This fixes 
      // `Refused to display 'src' in a frame because it set 'X-Frame-Options' to 'SAMEORIGIN'`.
      // error
      if (src.includes(YOUTUBE_VIDEO)) {
        return src.replace(YOUTUBE_VIDEO, YOUTUBE_EMBED);
      } 

      return src;
    }
  }
};
</script>

