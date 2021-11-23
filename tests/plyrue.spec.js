import { config, mount } from '@vue/test-utils';
import Plyr from 'plyr';
import { PlyrueComponent as Plyrue } from '@/';
config.showDeprecationWarnings = false;
jest.mock('Plyr', () => jest.fn());
Plyr.mockImplementation(() => ({
  on: jest.fn(),
  destroy: jest.fn(() => {
    // eslint-disable-next-line no-throw-literal
    throw 'error';
  })
}));

const src =
  'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4';
const sources = [
  {
    src:
      'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    type: 'video/mp4',
    size: '576'
  }
];

describe('Plyrue component', () => {
  it('destroys itself', () => {
    const wrapper = mount(Plyrue, {
      attachToDocument: true,
      attrs: {
        type: 'video',
        sources,
        src
      }
    });

    wrapper.vm.player.destroy = jest.fn();
    wrapper.destroy();
    expect(wrapper.vm.player.destroy).toHaveBeenCalled();
  });

  it.only('emits event', () => {
    const play = jest.fn();
    const wrapper = mount(Plyrue, {
      attachToDocument: true,
      attrs: {
        type: 'video',
        sources,
        src
      },
      listeners: { play }
    });
    wrapper.vm.emitPlayerEvent({ type: 'play' });
    expect(wrapper.emitted().play).toBeTruthy();
    expect(play).toHaveBeenCalled();
  });

  it('catches Youtube error', () => {
    const wrapper = mount(Plyrue, {
      attrs: {
        type: 'embed',
        src: 'https://vimeo.com/56282283'
      }
    });
    console.warn = jest.fn();
    wrapper.destroy();
    expect(console.warn).toHaveBeenCalled();
  });
});
