<script lang="ts">
import { defineComponent, useSlots } from 'vue';

/**
 * Renders whatever the consumer put in the default slot verbatim, letting
 * Plyr attach to a hand-written `<video>`/`<audio>` element.
 */
export default defineComponent({
  name: 'PlyrueDefault',
  inheritAttrs: false,
  setup() {
    const slots = useSlots();
    return () => slots.default?.() ?? null;
  }
});
</script>
