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
describe('Plyrue default type', () => {
  it('renders html5 audio with slot', () => {
    const wrapper = mount(Plyrue, {
      slots: {
        default: [
          `<audio>
            <source src="http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3" type="audio/mp3" />
          </audio>`
        ]
      }
    });

    expect(wrapper.find('audio')).toBeTruthy();
    expect(wrapper.find('source')).toBeTruthy();
  });
});
