import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Default from '@/components/Default.vue';
import { Plyrue } from '@/index';
import PlyrStub from './plyr-stub';
import { poster, src } from './fixtures';

describe('default type', () => {
  it('renders the default slot verbatim', () => {
    const wrapper = mount(Plyrue, {
      slots: {
        default: `<video controls playsinline poster="${poster}"><source src="${src}" type="video/mp4" /></video>`
      }
    });

    expect(wrapper.find('video').attributes('poster')).toBe(poster);
    expect(wrapper.find('source').attributes('src')).toBe(src);
    wrapper.unmount();
  });

  it('attaches the player to the slotted element', () => {
    const wrapper = mount(Plyrue, {
      slots: { default: `<video controls src="${src}"></video>` }
    });

    expect(PlyrStub.last.target.tagName).toBe('VIDEO');
    wrapper.unmount();
  });

  it('is the type used when none is given', () => {
    const wrapper = mount(Plyrue, {
      slots: { default: `<video src="${src}"></video>` }
    });

    expect(wrapper.findComponent(Default).exists()).toBe(true);
    wrapper.unmount();
  });

  it('does not create a player when the slot is empty', () => {
    const wrapper = mount(Plyrue);

    expect(PlyrStub.instances).toHaveLength(0);
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
