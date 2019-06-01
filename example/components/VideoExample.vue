<template>
  <plyrue
    poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
    src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
    type="video"
    ref="plyrue"
    :options="options"
    :sources="sources"
    :captions="captions"
  />
</template>

<script>
export default {
  data() {
    return {
      options: {
        controls: ['play', 'progress', 'current-time', 'volume', 'settings'],
      },
      sources: [
        {
          src:
            'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
          type: 'video/mp4',
          size: '576',
        },
        {
          src:
            'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
          type: 'video/mp4',
          size: '720',
        },
        {
          src:
            'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
          type: 'video/mp4',
          size: '1080',
        },
      ],
      captions: [
        {
          label: 'Français',
          srclang: 'fr',
          src:
            'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
        },
      ],
    };
  },
};
</script>
