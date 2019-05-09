<template>
  <component :is="component" v-bind="$attrs">
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope"/>
    </template>
  </component>
</template>

<script>
import Audio from "./Audio";
import Default from "./Default";
import Main from "./Main";
import Video from "./Video.vue";
import VideoEmbed from "./VideoEmbed.vue";

export default {
  extends: Main,
  name: 'plyrue',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: () => "default"
    }
  },
  computed: {
    component() {
      return `plyrue-${this.type}`;
    }
  },
  components: {
    "plyrue-default": Default,
    "plyrue-audio": Audio,
    "plyrue-video": Video,
    "plyrue-embed": VideoEmbed
  }
};
</script>
