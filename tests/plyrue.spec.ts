import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { Plyrue } from '@/index';
import { PLYR_EVENTS } from '@/events';
import PlyrStub from './plyr-stub';
import { captions, poster, sources, src, vimeoUrl } from './fixtures';

const videoProps = { type: 'video', sources, captions, poster, src } as const;

describe('Plyrue', () => {
  it('creates a Plyr instance bound to the rendered media element', () => {
    const wrapper = mount(Plyrue, { props: videoProps });

    expect(PlyrStub.instances).toHaveLength(1);
    expect(PlyrStub.last.target.tagName).toBe('VIDEO');
    wrapper.unmount();
  });

  it('passes options through to Plyr', () => {
    const options = { controls: ['play', 'progress'] };
    const wrapper = mount(Plyrue, { props: { ...videoProps, options } });

    expect(PlyrStub.last.options).toEqual(options);
    wrapper.unmount();
  });

  it('emits `player` with the instance once ready', () => {
    const wrapper = mount(Plyrue, { props: videoProps });

    expect(wrapper.emitted('player')?.[0][0]).toBe(PlyrStub.last);
    wrapper.unmount();
  });

  it('exposes the player instance on the component', () => {
    const wrapper = mount(Plyrue, { props: videoProps });

    expect(wrapper.vm.player).toBe(PlyrStub.last);
    wrapper.unmount();
  });

  it('re-emits every Plyr event', () => {
    const wrapper = mount(Plyrue, { props: videoProps });

    PLYR_EVENTS.forEach(event => PlyrStub.last.emit(event));

    PLYR_EVENTS.forEach(event => {
      expect(wrapper.emitted(event), `missing ${event}`).toBeTruthy();
    });
    wrapper.unmount();
  });

  it('forwards the original event payload', () => {
    const wrapper = mount(Plyrue, { props: videoProps });
    const payload = { type: 'play', detail: { plyr: PlyrStub.last } };

    PlyrStub.last.emit('play', payload);

    expect(wrapper.emitted('play')?.[0][0]).toBe(payload);
    wrapper.unmount();
  });

  it('destroys the player on unmount', () => {
    const wrapper = mount(Plyrue, { props: videoProps });
    const player = PlyrStub.last;

    wrapper.unmount();

    expect(player.destroy).toHaveBeenCalled();
    expect(player.destroyed).toBe(true);
  });

  it('swallows the YouTube Widget API error thrown on destroy', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(Plyrue, {
      props: { type: 'embed' as const, src: vimeoUrl }
    });
    PlyrStub.destroyError = 'The YouTube player is not attached to the DOM.';

    expect(() => wrapper.unmount()).not.toThrow();
    expect(warn).toHaveBeenCalledWith(
      'The YouTube player is not attached to the DOM.'
    );
    warn.mockRestore();
  });

  it('applies the poster prop to the player', () => {
    const wrapper = mount(Plyrue, { props: videoProps });

    expect(PlyrStub.last.poster).toBe(poster);
    wrapper.unmount();
  });

  it('falls back to options.poster when the prop is absent', () => {
    const wrapper = mount(Plyrue, {
      props: {
        type: 'video' as const,
        sources,
        src,
        options: { poster } as Plyr.Options
      }
    });

    expect(PlyrStub.last.poster).toBe(poster);
    wrapper.unmount();
  });

  it('updates the player poster reactively', async () => {
    const wrapper = mount(Plyrue, { props: videoProps });
    const next = 'https://example.com/next.jpg';

    await wrapper.setProps({ poster: next });

    expect(PlyrStub.last.poster).toBe(next);
    wrapper.unmount();
  });

  it('recreates the player when options change', async () => {
    const wrapper = mount(Plyrue, {
      props: { ...videoProps, options: { controls: ['play'] } }
    });
    const first = PlyrStub.last;

    await wrapper.setProps({ options: { controls: ['play', 'volume'] } });

    expect(first.destroy).toHaveBeenCalled();
    expect(PlyrStub.instances).toHaveLength(2);
    expect(PlyrStub.last.options).toEqual({ controls: ['play', 'volume'] });
    wrapper.unmount();
  });

  it('renders a `.plyrue` wrapper element', () => {
    const wrapper = mount(Plyrue, { props: videoProps });

    expect(wrapper.classes()).toContain('plyrue');
    wrapper.unmount();
  });

  it('is safe to unmount twice', () => {
    const wrapper = mount(Plyrue, { props: videoProps });

    wrapper.unmount();

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
