<template>
  <div class="flex-it">
    <plyrue
      type="video"
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      :options="options"
      crossorigin
    >
      <source
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
        type="video/mp4"
        size="576"
      >
      <source
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
        type="video/mp4"
        size="720"
      >
      <source
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
        type="video/mp4"
        size="1080"
      >
      <track
        kind="captions"
        label="English"
        srclang="en"
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
        default
      >
      <track
        kind="captions"
        label="Français"
        srclang="fr"
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
      >
      <a
        href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
        download
      >Download</a>
    </plyrue>
    <plyrue
      :options="options"
      type="embed"
      src="https://player.vimeo.com/video/6370469"
      allowtransparency
      allow="autoplay"
    ></plyrue>
    <plyrue
      :options="options"
      type="embed"
      width="500"
      src="https://www.youtube.com/watch?v=MmeJU4FMVGk"
      allowtransparency
      allow="autoplay"
    ></plyrue>
    <plyrue>
      <video
        crossorigin
        playsinline
        poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      >
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          type="video/mp4"
          size="576"
        >
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
          type="video/mp4"
          size="720"
        >
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
          type="video/mp4"
          size="1080"
        >
        <track
          kind="captions"
          label="English"
          srclang="en"
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
          default
        >
        <track
          kind="captions"
          label="Français"
          srclang="fr"
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
        >
        <a
          href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          download
        >Download</a>
      </video>
    </plyrue>
    <plyrue
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      type="video"
      ref="plyrue"
      :options="options"
      :sources="sources"
      :captions="captions"
    ></plyrue>
    <plyrue
      type="audio"
      :sources="audio"
    ></plyrue>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      options: {
        controls: ["play", "progress", "current-time", "volume", "settings"]
      },
      sources: [
        {
          src:
            "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
          type: "video/mp4",
          size: "576"
        },
        {
          src:
            "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
          type: "video/mp4",
          size: "720"
        },
        {
          src:
            "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
          type: "video/mp4",
          size: "1080"
        }
      ],
      captions: [
        {
          label: "Français",
          srclang: "fr",
          src:
            "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
        }
      ],
      audio: [
        {
          src: "http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3",
          type: "audio/mp3"
        }
      ]
    };
  },
  mounted () {
    this.$refs.plyrue.player.on('pause', (e) => {
      // eslint-disable-next-line
      console.log(`Event: ${e.type}`);
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.flex-it {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flex-it > div {
  flex: 1;
  width: 420px;
}
</style>
