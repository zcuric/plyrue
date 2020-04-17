<p align="center">
  <a href="#">
    <img width="150"src="./docs/logo.png">
  </a>
</p>
<h1 align="center">Plyrue</h1>
<p align="center">Vue.js plugin for <a href="https://plyr.io">Plyr</a></p>

<p align="center">
<a href="https://www.npmjs.com/package/plyrue"><img src="https://img.shields.io/npm/v/plyrue.svg"/></a>
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg"/></a>
<a href="https://circleci.com/gh/zcuric/plyrue">
<img src="https://circleci.com/gh/zcuric/plyrue/tree/master.svg?style=svg"/></a>
</p>

## About

Plyrue (/pliru/) is a Vue plugin that is actually a wrapper around popular media player, [Plyr](https://plyr.io). It provides a simple API to work with Vue applications.

## Installation

```
npm install plyrue
# or
yarn add plyrue
```

## Initialization

```js
import App from './App.vue';
import Plyrue from 'plyrue';
import Vue from 'vue';

Vue.use(Plyrue);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

Plyrue component can be used in without plugin initialization:
```js
import { PlyrueComponent as Plyrue } from 'plyrue';
...
export default { 
  ...
  components: { Plyrue }
}
```


## Usage

Plyrue can be used in two ways:

- with slots
- with data (for audio and video)

### With slots

```vue
<plyrue
  type="video"
  poster="https://example.com/video-HD.jpg"
  src="https://example.com/video-576p.mp4"
  :options="options"
  crossorigin
>
  <source
    src="https://example.com/video-576p.mp4"
    type="video/mp4"
    size="576"
  >
  <track
    kind="captions"
    label="English"
    srclang="en"
    src="https://example.com/video-HD.en.vtt"
    default
  >
</plyrue>
```

When using slot the `video` or `audio` tag is omitted if the `type` props is set. If `type` is not set the `default` component will be used and in that case you must include the `video` or `audio` tag. Example:

```vue
<plyrue>
  <video
    controls
    src="https://example.com/video-576p.mp4"
  >
    <source
      src="https://example.com/video-1080p.mp4"
      type="video/mp4"
      size="1080"
    >
    <track
      kind="captions"
      label="English"
      srclang="en"
      src="https://example.com/video-HD.en.vtt"
      default
    >
    <a
      href="https://example.com/video-576p.mp4"
      download
    >Download</a>
  </video>
</plyrue>
```

### With data

```vue
<template>
  <plyrue
    poster="https://example.com/video-HD.jpg"
    src="https://example.com/video-576p.mp4"
    type="video"
    ref="plyrue"
    :sources="sources"
    :captions="captions"
  />
</template>

<script>
export default {
  data() {
    return {
      sources: [
        {
          src: 'https://example.com/video-576p.mp4',
          type: 'video/mp4',
          size: '576',
        },
      ],
      captions: [
        {
          label: 'Croatian',
          srclang: 'hr',
          src: 'https://example.com/video-HD.hr.vtt',
        },
      ],
    };
  },
};
</script>
```

## Plugin options

```
Vue.use(Plyrue, pluginOptions)
```

### name

- **Type**: `string`
- **Default**: `plyrue`.

The plugin name.

## Props

### type

- **Type**: `string`
- **Default**: `default`

Type of media you want use

- `video` for HTML5 video
- `audio` for HTML5 audio
- `embed` for Youtube and Vimeo.

If type is unspecified it will default to a `default` component which only proxies the slot.

For examples and usage please check the [examples folder](https://github.com/zcuric/plyrue/tree/master/example).

### options

- **Type**: `Object`
- **Default**: `{}`

Options for Plyr player. Documentation for Plyr options can be found [here](https://github.com/sampotts/plyr#options).

### sources

- **Type**: `Array`
- **Required**: false

Array of objects. For videos:

```js
[
  {
    src: 'https://example.com/video.mp4',
    type: 'video/mp4', // or any other valid type
    size: '576' // example size
  },
  ...
]
```

For audio:

```js
 [
  {
    src: 'https://example.com/video.m24',
    type: 'audio/mp3', // or any other valid type
  },
  ...
]
```

### captions

- **Type**: `Array`
- **Required**: false

Array of objects. Captions for video type:

```js
[
  {
    label: 'Croatian',
    srclang: 'hr',
    src:'https://example.com/caption.hr.vtt',
  },
],
...
```

## Attributes

All valid attributes for `video`, `audio` and `iframe` are passed down to the corresponding components. `Plyrue` provides defaults for `video` and `audio`.

Check the valid attributes here:

- [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#Attributes)
- [audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#Attributes)
- [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)

Example:

```vue
<plyrue type="audio" :sources="audio" autoplay loop />
```

## Events

`Plyrue` component supports `plyr` events.
Events are documented [here](https://github.com/sampotts/plyr#events).

```vue
<template>
  <plyrue @playing="handlePlaying" ... />
</template>

<script>
export default {
  methods: { 
    handlePlaying(event) {}
  }
};
</script>
```


## Development

```
# Running examples
npm run serve

# Running tests
npm run test

# Running build
npm run build
```

## TODO

- Rewrite in TS
- Make documentation better
- Check SSR compatibility
- Provide more examples

## Contributing

All contributions are welcome.

## Credits

`Plyrue` is inspired by [`vue-plyr`](https://github.com/redxtech/vue-plyr).

## License

MIT @ Zdravko Ćurić [(zcuric)](https://github.com/zcuric)
