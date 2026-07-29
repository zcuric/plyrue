<template>
  <div ref="root" class="plyrue">
    <component :is="component" v-bind="$attrs">
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope || {}"></slot>
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import PlyrCtor from 'plyr';
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
  type PropType
} from 'vue';
import Audio from './Audio.vue';
import Default from './Default.vue';
import Video from './Video.vue';
import VideoEmbed from './VideoEmbed.vue';
import { PLYR_EVENTS } from '../events';
import type { PlyrueType } from '../types';

const COMPONENTS = {
  default: Default,
  audio: Audio,
  video: Video,
  embed: VideoEmbed
} as const;

export default defineComponent({
  name: 'plyrue',
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<PlyrueType>,
      default: 'default',
      validator: (value: string) => value in COMPONENTS
    },
    options: {
      type: Object as PropType<Plyr.Options>,
      default: () => ({})
    },
    poster: {
      type: String,
      default: undefined
    }
  },
  emits: ['player', ...PLYR_EVENTS],
  setup(props, { emit }) {
    const root = ref<HTMLElement | null>(null);
    const player = shallowRef<Plyr | null>(null);

    const create = () => {
      const target = root.value?.firstElementChild;
      if (!target) return;
      const instance = new PlyrCtor(target as HTMLElement, props.options);
      player.value = instance;
      // `poster` is not part of Plyr's Options type but has always been accepted here.
      const poster =
        props.poster ?? (props.options as { poster?: string }).poster;
      if (poster) instance.poster = poster;
      PLYR_EVENTS.forEach(event => {
        instance.on(event as keyof Plyr.PlyrEventMap, (e: Plyr.PlyrEvent) =>
          emit(event, e)
        );
      });
      emit('player', instance);
    };

    const destroy = () => {
      const instance = player.value;
      player.value = null;
      if (!instance) return;
      try {
        instance.destroy();
      } catch (error) {
        /**
         * Suppresses the YouTube Widget API error thrown when an embed player
         * is destroyed before the iframe API has finished booting.
         */
        console.warn((error as Error)?.message ?? error);
      }
    };

    onMounted(create);
    onBeforeUnmount(destroy);

    watch(
      () => props.poster,
      poster => {
        if (player.value && poster) player.value.poster = poster;
      }
    );

    watch(
      () => props.options,
      () => {
        destroy();
        create();
      },
      { deep: true }
    );

    const component = computed(() => COMPONENTS[props.type] ?? Default);

    return { root, player, component };
  }
});
</script>
