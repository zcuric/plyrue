import { mount } from '@vue/test-utils';
import { PlyrueComponent as Plyrue } from '@/';
jest.mock('plyr');

const sources = [
  {
    src: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3',
    type: 'audio/mp3',
  },
];

describe('Plyrue audio type', () => {
  it('renders html5 audio with sources attribute', () => {
    const wrapper = mount(Plyrue, {
      attrs: {
        type: 'audio',
        sources,
      },
    });

    expect(wrapper.contains('audio')).toBe(true);
    expect(wrapper.contains('source')).toBe(true);

    wrapper.destroy();
  });

  it('sets audio player attributes', () => {
    const wrapper = mount(Plyrue, {
      attrs: {
        type: 'audio',
        sources,
        controls: false,
        muted: true,
      },
    });

    expect(wrapper.find('audio').attributes().controls).toBe(undefined);
    expect(wrapper.find('audio').attributes().muted).toBe('muted');

    wrapper.destroy();
  });

  it('renders html5 audio with source slot', () => {
    const wrapper = mount(Plyrue, {
      slots: {
        default: [
          '<source src="http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3" type="audio/mp3">',
        ],
      },
      attrs: {
        type: 'audio',
      },
    });

    expect(wrapper.contains('audio')).toBe(true);
    expect(wrapper.contains('source')).toBe(true);
  });
});
