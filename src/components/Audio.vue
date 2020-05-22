<template>
  <audio v-bind="attributes">
    <slot></slot>
    <template v-if="sources">
      <source v-for="source in sources" :key="source.src" v-bind="source">
    </template>
  </audio>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    sources: {
      type: Array,
      default: () => []
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: false
    },
    muted: {
      type: Boolean,
      default: false
    },
    preload: {
      type: String,
      default: 'none'
    },
    src: {
      type: String,
      default: null
    }
  },
  computed: {
    attributes() {
      const attributes = { ...this.$props };
      delete attributes.sources;
      return attributes;
    }
  }
};
</script>
