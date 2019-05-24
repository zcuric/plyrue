<template>
  <div>
    <component :is="component" v-bind="$attrs">
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope"/>
      </template>
    </component>
  </div>
</template>

<script>
import Audio from "./Audio";
import Default from "./Default";
import Plyr from 'plyr';
import Video from "./Video.vue";
import VideoEmbed from "./VideoEmbed.vue";

export default {
  name: 'plyrue',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "default"
    },
    options: {
      type: Object,
      default: () => ({})
    },
    emit: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    const { $el, options, emit, emitPlayerEvent } = this;
    this.player = new Plyr($el.firstChild, options);
    this.$emit('player', this.player);
    emit.forEach(el => this.player.on(el, emitPlayerEvent));
  },
  beforeDestroy() {
    try {
      this.player && this.player.destroy();
    } catch (e) {
      console.warn(e.message);
    }
  },
  methods: {
    emitPlayerEvent(event) {
      this.$emit(event.type, event);
    }
  },
  computed: {
    component() {
      if (!this.type) return 'div';
      return `plyrue-${this.type}`;
    }
  },
  components: {
    "plyrue-audio": Audio,
    "plyrue-default": Default,
    "plyrue-video": Video,
    "plyrue-embed": VideoEmbed
  }
};
</script>
