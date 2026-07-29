import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Video from '@/components/Video.vue';
import { Plyrue } from '@/index';
import { captions, poster, sources, src } from './fixtures';

describe('video type', () => {
  it('renders a <video> with one <source> per entry', () => {
    const wrapper = mount(Plyrue, {
      props: { type: 'video', sources, captions, poster, src }
    });

    expect(wrapper.find('video').exists()).toBe(true);
    expect(wrapper.findAll('source')).toHaveLength(sources.length);
    expect(wrapper.findComponent(Video).exists()).toBe(true);
    wrapper.unmount();
  });

  it('renders a <track> per caption', () => {
    const wrapper = mount(Plyrue, {
      props: { type: 'video', sources, captions, src }
    });
    const track = wrapper.find('track');

    expect(track.attributes('src')).toBe(captions[0].src);
    expect(track.attributes('kind')).toBe('captions');
    expect(track.attributes('srclang')).toBe('fr');
    wrapper.unmount();
  });

  it('sets media attributes and omits the collection props', () => {
    const wrapper = mount(Plyrue, {
      props: {
        type: 'video',
        sources,
        captions,
        src,
        controls: false,
        autoplay: true
      }
    });
    const attributes = wrapper.find('video').attributes();

    expect(attributes.src).toBe(src);
    expect(attributes.controls).toBeUndefined();
    expect(attributes.autoplay).toBeDefined();
    expect(attributes.sources).toBeUndefined();
    expect(attributes.captions).toBeUndefined();
    wrapper.unmount();
  });

  it('renders sources supplied through the default slot', () => {
    const wrapper = mount(Plyrue, {
      props: { type: 'video', src, poster },
      slots: { default: `<source src="${src}" type="video/mp4" />` }
    });

    expect(wrapper.find('video source').attributes('src')).toBe(src);
    wrapper.unmount();
  });
});

describe('Video component', () => {
  it('drops `sources` and `captions` from the element attributes', () => {
    const wrapper = mount(Video, { props: { sources, captions, src } });
    const attributes = wrapper.attributes();

    expect(attributes.sources).toBeUndefined();
    expect(attributes.captions).toBeUndefined();
    expect(attributes.src).toBe(src);
  });

  it('defaults to controls on and no autoplay', () => {
    const wrapper = mount(Video, { props: { src } });

    expect(wrapper.attributes('controls')).toBeDefined();
    expect(wrapper.attributes('autoplay')).toBeUndefined();
  });
});
