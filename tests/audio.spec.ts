import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Audio from '@/components/Audio.vue';
import { Plyrue } from '@/index';
import PlyrStub from './plyr-stub';
import { audioSources, audioSrc } from './fixtures';

describe('audio type', () => {
  it('renders an <audio> element with sources', () => {
    const wrapper = mount(Plyrue, {
      props: { type: 'audio', sources: audioSources, src: audioSrc }
    });

    expect(wrapper.find('audio').exists()).toBe(true);
    expect(wrapper.findAll('source')).toHaveLength(audioSources.length);
    expect(wrapper.findComponent(Audio).exists()).toBe(true);
    wrapper.unmount();
  });

  it('attaches the player to the <audio> element', () => {
    const wrapper = mount(Plyrue, {
      props: { type: 'audio', sources: audioSources, src: audioSrc }
    });

    expect(PlyrStub.last.target.tagName).toBe('AUDIO');
    wrapper.unmount();
  });

  it('renders sources supplied through the default slot', () => {
    const wrapper = mount(Plyrue, {
      props: { type: 'audio' },
      slots: { default: `<source src="${audioSrc}" type="audio/mp3" />` }
    });

    expect(wrapper.find('audio source').attributes('src')).toBe(audioSrc);
    wrapper.unmount();
  });
});

describe('Audio component', () => {
  it('drops `sources` from the element attributes', () => {
    const wrapper = mount(Audio, {
      props: { sources: audioSources, src: audioSrc }
    });

    expect(wrapper.attributes('sources')).toBeUndefined();
    expect(wrapper.attributes('src')).toBe(audioSrc);
  });

  it('defaults preload to none', () => {
    const wrapper = mount(Audio, { props: { src: audioSrc } });

    expect(wrapper.attributes('preload')).toBe('none');
  });
});
