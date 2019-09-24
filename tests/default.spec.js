import { mount } from '@vue/test-utils';
import { PlyrueComponent as Plyrue } from '@/';
jest.mock('plyr');

describe('Plyrue default type', () => {
  it('renders html5 audio with slot', () => {
    const wrapper = mount(Plyrue, {
      slots: {
        default: [
          `<audio>
            <source src="http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3" type="audio/mp3" />
          </audio>`,
        ],
      },
    });

    expect(wrapper.contains('audio')).toBe(true);
    expect(wrapper.contains('source')).toBe(true);
  });
});
