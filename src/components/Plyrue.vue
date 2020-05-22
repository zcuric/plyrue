<template>
  <div class="plyrue">
    <component :is="component" v-bind="$attrs">
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </component>
  </div>
</template>

<script>
import Audio from './Audio.vue';
import Default from './Default.vue';
import Plyr from 'plyr';
import Video from './Video.vue';
import VideoEmbed from './VideoEmbed.vue';

export default {
  name: 'plyrue',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'default',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    poster: {
      type: String,
      default: null,
    },
  },
  mounted() {
    const { $el, options, emitPlayerEvent } = this;
    const poster = this.poster || options.poster
    this.player = new Plyr($el.firstChild, options);
    if(poster) this.player.poster = poster;
    this.$emit('player', this.player);
    const events = Object.keys(this.$listeners);
    events.forEach(event => {
      this.player.on(event, emitPlayerEvent);
    });
  },
  beforeDestroy() {
    try {
      this.player && this.player.destroy();
    } catch (e) {
      /**
       * Suppresing Youtube Widget API error
       * when plyrue gets destroyed in case of embed compoent
       * */
      console.warn(e.message);
    }
  },
  methods: {
    emitPlayerEvent(event) {
      this.$emit(event.type, event);
    },
  },
  computed: {
    component() {
      return `plyrue-${this.type}`;
    },
  },
  components: {
    'plyrue-audio': Audio,
    'plyrue-default': Default,
    'plyrue-video': Video,
    'plyrue-embed': VideoEmbed,
  },
};
</script>
