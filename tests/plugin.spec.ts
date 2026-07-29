import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createApp, defineComponent } from 'vue';
import PlyruePlugin, { Plyrue, PlyrueComponent } from '@/index';
import { src } from './fixtures';

const Host = defineComponent({
  template: `<plyrue type="video" src="${src}" />`
});

describe('PlyruePlugin', () => {
  it('registers the component as `plyrue`', () => {
    const app = createApp({});
    app.use(PlyruePlugin);

    expect(app.component('plyrue')).toBe(Plyrue);
  });

  it('honours a custom component name', () => {
    const app = createApp({});
    app.use(PlyruePlugin, { name: 'my-player' });

    expect(app.component('my-player')).toBe(Plyrue);
    expect(app.component('plyrue')).toBeUndefined();
  });

  it('makes the component usable in templates', () => {
    const wrapper = mount(Host, { global: { plugins: [PlyruePlugin] } });

    expect(wrapper.find('video').exists()).toBe(true);
    wrapper.unmount();
  });

  it('exports the component under both names', () => {
    expect(PlyrueComponent).toBe(Plyrue);
  });
});
