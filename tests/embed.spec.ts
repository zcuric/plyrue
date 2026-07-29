import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import VideoEmbed from '@/components/VideoEmbed.vue';
import { Plyrue } from '@/index';
import { vimeoUrl, youtubeUrl } from './fixtures';

const embed = (src: string) => mount(VideoEmbed, { props: { src } });

describe('embed type', () => {
  it.each([
    ['youtube', youtubeUrl],
    ['vimeo', vimeoUrl]
  ])('renders an iframe for %s', (_name, src) => {
    const wrapper = mount(Plyrue, { props: { type: 'embed', src } });

    expect(wrapper.find('iframe').exists()).toBe(true);
    expect(wrapper.findComponent(VideoEmbed).exists()).toBe(true);
    wrapper.unmount();
  });

  it('wraps the iframe in Plyr’s embed container', () => {
    const wrapper = mount(Plyrue, { props: { type: 'embed', src: vimeoUrl } });

    expect(wrapper.find('.plyr__video-embed').exists()).toBe(true);
    wrapper.unmount();
  });
});

describe('VideoEmbed component', () => {
  it('rewrites a YouTube watch url to its embed url', () => {
    expect(embed(youtubeUrl).find('iframe').attributes('src')).toBe(
      'https://www.youtube.com/embed/jNQXAC9IVRw'
    );
  });

  it('rewrites a YouTube watch url that carries extra query params', () => {
    const wrapper = embed(`${youtubeUrl}&t=42s&list=PL123`);

    expect(wrapper.find('iframe').attributes('src')).toBe(
      'https://www.youtube.com/embed/jNQXAC9IVRw'
    );
  });

  it('leaves other urls untouched', () => {
    expect(embed(vimeoUrl).find('iframe').attributes('src')).toBe(vimeoUrl);
  });

  it.each([
    'javascript:alert(document.domain)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)'
  ])('refuses to load the unsafe url %s', unsafe => {
    expect(embed(unsafe).find('iframe').attributes('src')).toBeUndefined();
  });

  it('renders no src when none is given', () => {
    const wrapper = mount(VideoEmbed);

    expect(wrapper.find('iframe').attributes('src')).toBeUndefined();
  });

  it('sets the attributes Plyr needs on the iframe', () => {
    const attributes = embed(vimeoUrl).find('iframe').attributes();

    expect(attributes.allowfullscreen).toBeDefined();
    expect(attributes.allow).toBe('autoplay');
  });
});
