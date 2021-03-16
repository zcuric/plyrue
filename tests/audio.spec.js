import { config, mount } from '@vue/test-utils';
import Plyr from 'plyr';
import { PlyrueComponent as Plyrue } from '@/';
config.showDeprecationWarnings = false;
jest.mock('Plyr');
Plyr.mockImplementation(() => ({
  on: jest.fn(),
  destroy: jest.fn()
}));

const sources = [
  {
    src: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3',
    type: 'audio/mp3'
  }
];

describe('Plyrue audio type', () => {
  it('renders html5 audio with sources attribute', () => {
    const wrapper = mount(Plyrue, {
      attrs: {
        type: 'audio',
        sources
      }
    });

    expect(wrapper.find('audio')).toBeTruthy();
    expect(wrapper.find('source')).toBeTruthy();

    wrapper.destroy();
  });

  it('sets audio player attributes', () => {
    const wrapper = mount(Plyrue, {
      attrs: {
        type: 'audio',
        sources,
        controls: false,
        muted: true
      }
    });

    expect(wrapper.find('audio').attributes().controls).toBe(undefined);
    expect(wrapper.find('audio').attributes().muted).toBe('muted');

    wrapper.destroy();
  });

  it('renders html5 audio with source slot', () => {
    const wrapper = mount(Plyrue, {
      slots: {
        default: [
          '<source src="http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3" type="audio/mp3">'
        ]
      },
      attrs: {
        type: 'audio'
      }
    });

    expect(wrapper.find('audio')).toBeTruthy();
    expect(wrapper.find('source')).toBeTruthy();
  });
});
