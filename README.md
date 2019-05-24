<p align="center">
  <a href="#">
    <img width="150"src="./docs/logo.png">
  </a>
</p>
<h1 align="center">Plyrue</h1>
<p align="center">Vue.js plugin for <a href="https://plyr.io">Plyr</a></p>

## About
Plyrue (/pliru/) is a Vue plugin that is actually a wrapper around popular media player, Plyr. It provides a simple API to work with Vue applications. 

## Installation 
```
npm install plyrue
```

## Initialization 
```js
import App from './App.vue'
import Plyrue from 'plyrue';
import Vue from 'vue'

Vue.use(Plyrue);

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## Usage

Plyrue can be used in two ways: 
- with slots 
- with data

It has 3 types of components which can be specified when using `plyrue` component:
- `video` for HTML5 video
- `audio` for HTML5 audio
- `embed` for Youtube and Vimeo. 

If type is uspecifed it will default to a `default` component which only proxies the slot. 

#### Types 

#1 Video
```js
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
      ]
    };
  }
}
</script>
```