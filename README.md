<p align="center">
  <a href="#">
    <img width="150" src="./docs/logo.png">
  </a>
</p>
<h1 align="center">Plyrue</h1>
<p align="center">Vue 3 plugin for <a href="https://plyr.io">Plyr</a></p>

<p align="center">
<a href="https://www.npmjs.com/package/plyrue"><img src="https://img.shields.io/npm/v/plyrue.svg"/></a>
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg"/></a>
<a href="https://github.com/zcuric/plyrue/actions/workflows/ci.yml"><img src="https://github.com/zcuric/plyrue/actions/workflows/ci.yml/badge.svg"/></a>
</p>

## About

Plyrue (/pliru/) is a Vue plugin that wraps the [Plyr](https://plyr.io) media player and gives it a simple, declarative API.

Written in TypeScript, shipped as ESM + UMD with bundled type declarations.

## Requirements

| Plyrue | Vue  | Plyr   | Node     |
| ------ | ---- | ------ | -------- |
| 3.x    | ^3.4 | ^3.7.8 | >= 20.19 |
| 2.x    | ^2.6 | ^3.6   | —        |

`vue` and `plyr` are peer dependencies — install them alongside Plyrue.

## Installation

```sh
npm install plyrue plyr
```

Import Plyr's stylesheet once in your app:

```js
import 'plyr/dist/plyr.css';
```

## Initialization

```ts
import { createApp } from 'vue';
import Plyrue from 'plyrue';
import 'plyr/dist/plyr.css';
import App from './App.vue';

createApp(App).use(Plyrue).mount('#app');
```

Or import the component directly, without registering the plugin:

```vue
<script setup lang="ts">
import { Plyrue } from 'plyrue';
</script>

<template>
  <Plyrue type="video" src="https://example.com/video-576p.mp4" />
</template>
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
>
  <source src="https://example.com/video-576p.mp4" type="video/mp4" size="576" />
  <track
    kind="captions"
    label="English"
    srclang="en"
    src="https://example.com/video-HD.en.vtt"
    default
  />
</plyrue>
```

When `type` is set, Plyrue renders the `video` / `audio` tag for you. When it is not set, the `default` component is used and you must supply the media element yourself:

```vue
<plyrue>
  <video controls src="https://example.com/video-576p.mp4">
    <source src="https://example.com/video-1080p.mp4" type="video/mp4" size="1080" />
    <track
      kind="captions"
      label="English"
      srclang="en"
      src="https://example.com/video-HD.en.vtt"
      default
    />
    <a href="https://example.com/video-576p.mp4" download>Download</a>
  </video>
</plyrue>
```

### With data

```vue
<script setup lang="ts">
import type { PlyrueCaption, PlyrueSource } from 'plyrue';

const sources: PlyrueSource[] = [
  { src: 'https://example.com/video-576p.mp4', type: 'video/mp4', size: 576 }
];

const captions: PlyrueCaption[] = [
  {
    label: 'Croatian',
    srclang: 'hr',
    src: 'https://example.com/video-HD.hr.vtt'
  }
];
</script>

<template>
  <plyrue
    type="video"
    poster="https://example.com/video-HD.jpg"
    src="https://example.com/video-576p.mp4"
    :sources="sources"
    :captions="captions"
  />
</template>
```

## Plugin options

```ts
app.use(Plyrue, { name: 'my-player' });
```

### name

- **Type**: `string`
- **Default**: `plyrue`

The name the component is registered under.

## Props

### type

- **Type**: `'default' | 'audio' | 'video' | 'embed'`
- **Default**: `'default'`

- `video` for HTML5 video
- `audio` for HTML5 audio
- `embed` for YouTube and Vimeo
- `default` renders the slot as-is

### options

- **Type**: `Plyr.Options`
- **Default**: `{}`

Options for the Plyr player, documented [here](https://github.com/sampotts/plyr#options). The player is recreated when this object changes.

### poster

- **Type**: `string`
- **Required**: false

Poster image, applied to the player and kept in sync when it changes.

### sources

- **Type**: `PlyrueSource[]`
- **Required**: false

For video:

```ts
[{ src: 'https://example.com/video.mp4', type: 'video/mp4', size: 576 }];
```

For audio:

```ts
[{ src: 'https://example.com/audio.mp3', type: 'audio/mp3' }];
```

### captions

- **Type**: `PlyrueCaption[]`
- **Required**: false

```ts
[
  {
    label: 'Croatian',
    srclang: 'hr',
    src: 'https://example.com/caption.hr.vtt'
  }
];
```

## Attributes

All valid attributes for `video`, `audio` and `iframe` are passed down to the corresponding element. Plyrue provides sensible defaults for `video` and `audio`.

- [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes)
- [audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#attributes)
- [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)

```vue
<plyrue type="audio" :sources="audio" autoplay loop />
```

## Events

Every [Plyr event](https://github.com/sampotts/plyr#events) is re-emitted by the component, plus a `player` event carrying the Plyr instance once it is created.

```vue
<script setup lang="ts">
import type { PlyrPlayer } from 'plyrue';

const onPlayer = (player: PlyrPlayer) => console.log(player);
const onPlaying = (event: Event) => console.log(event);
</script>

<template>
  <plyrue type="video" src="…" @player="onPlayer" @playing="onPlaying" />
</template>
```

The full list is exported as `PLYR_EVENTS`.

## Accessing the player instance

```vue
<script setup lang="ts">
import { ref } from 'vue';

const plyrue = ref();
const pause = () => plyrue.value?.player?.pause();
</script>

<template>
  <plyrue ref="plyrue" type="video" src="…" />
</template>
```

## Migrating from 2.x

- Requires Vue 3. Register with `app.use(Plyrue)` instead of `Vue.use(Plyrue)`.
- `vue` and `plyr` are now peer dependencies you install yourself.
- Plyr's CSS is no longer imported by the package — add `import 'plyr/dist/plyr.css'` to your app.
- All Plyr events are emitted unconditionally; you no longer need a listener attached at mount time for an event to fire.
- `embed` sources are restricted to `http(s)` URLs; anything else renders an iframe with no `src`.
- The package is published as ESM + UMD (`plyrue.js` / `plyrue.umd.cjs`) with bundled types.

## Development

```sh
npm run dev            # run the example app
npm run test           # run the test suite
npm run test:coverage  # run tests with coverage
npm run lint           # lint
npm run typecheck      # type-check
npm run build          # type-check and build the library
```

## Contributing

All contributions are welcome.

## Credits

`Plyrue` is inspired by [`vue-plyr`](https://github.com/redxtech/vue-plyr).

## License

MIT @ Zdravko Ćurić [(zcuric)](https://github.com/zcuric)
