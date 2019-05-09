import Plyr from 'plyr';

export default {
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    emit: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      player: {}
    }
  },
  mounted() {
    const { $el, options, emit, emitPlayerEvent } = this;
    this.player = new Plyr($el.firstChild, options);
    this.$emit('player', this.player);
    emit.forEach(el => this.player.on(el, emitPlayerEvent));
  },
  methods: {
    emitPlayerEvent(event) {
      this.$emit(event.type, event);
    }
  },
}