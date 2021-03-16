import { config, mount } from '@vue/test-utils';
import Plyr from 'plyr';
import { PlyrueComponent as Plyrue } from '@/';
import VideoEmbed from '@/components/VideoEmbed.vue';
config.showDeprecationWarnings = false;
jest.mock('Plyr');
Plyr.mockImplementation(() => ({
  on: jest.fn(),
  destroy: jest.fn()
}));

describe('Plyrue video embed type', () => {
  it('embeds youtube video', () => {
    const wrapper = mount(Plyrue, {
      stubs: {
        VideoEmbed
      },
      attrs: {
        type: 'embed',
        src: 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
      }
    });

    expect(wrapper.find('iframe')).toBeTruthy();
    expect(wrapper.findComponent(VideoEmbed)).toBeTruthy();
    wrapper.destroy();
  });

  it('embeds vimeo video', () => {
    const wrapper = mount(Plyrue, {
      stubs: {
        VideoEmbed
      },
      attrs: {
        type: 'embed',
        src: 'https://vimeo.com/56282283'
      }
    });

    expect(wrapper.find('iframe')).toBeTruthy();
    expect(wrapper.findComponent(VideoEmbed)).toBeTruthy();
    wrapper.destroy();
  });
});

describe('VideoEmbed component', () => {
  it('Converts youtube video url to youtube embed url', () => {
    const wrapper = mount(VideoEmbed, {
      propsData: {
        src: 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
      }
    });

    expect(wrapper.find('iframe').attributes('src')).toBe(
      'https://www.youtube.com/embed/jNQXAC9IVRw'
    );
    wrapper.destroy();
  });
});
