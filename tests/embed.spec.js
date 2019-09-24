import { mount } from '@vue/test-utils';
import { PlyrueComponent as Plyrue } from '@/';
import VideoEmbed from '@/components/VideoEmbed.vue';
jest.mock('plyr');

describe('Plyrue video embed type', () => {
  it('embeds youtube video', () => {
    const wrapper = mount(Plyrue, {
      stubs: {
        VideoEmbed,
      },
      attrs: {
        type: 'embed',
        src: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      },
    });

    expect(wrapper.contains('iframe')).toBe(true);
    expect(wrapper.find(VideoEmbed).is(VideoEmbed)).toBe(true);
    wrapper.destroy();
  });

  it('embeds vimeo video', () => {
    const wrapper = mount(Plyrue, {
      stubs: {
        VideoEmbed,
      },
      attrs: {
        type: 'embed',
        src: 'https://vimeo.com/56282283',
      },
    });

    expect(wrapper.contains('iframe')).toBe(true);
    expect(wrapper.find(VideoEmbed).is(VideoEmbed)).toBe(true);
    wrapper.destroy();
  });
});

describe('VideoEmbed component', () => {
  it('Converts youtube video url to youtube embed url', () => {
    const wrapper = mount(VideoEmbed, {
      propsData: {
        src: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      },
    });

    expect(wrapper.find('iframe').attributes('src')).toBe(
      'https://www.youtube.com/embed/jNQXAC9IVRw'
    );
    wrapper.destroy();
  });
});
