import { mount } from '@vue/test-utils'
import Plyrue from '@/components/Plyrue.vue'
import Video from '@/components/Video.vue'
jest.mock('plyr');

const poster = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"';
const src = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4';
const sources = [
  {
    src:
      "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    type: "video/mp4",
    size: "576"
  },
  {
    src:
      "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    type: "video/mp4",
    size: "720"
  },
  {
    src:
      "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
    type: "video/mp4",
    size: "1080"
  }
];
const captions = [{
    label: "Français",
    srclang: "fr",
    src:"https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
  }
];

describe('Plyrue video type', () => {
  it('renders html5 video with sources attribute', () => {
    const wrapper = mount(Plyrue, {
      stubs: {
        Video
      },
      attrs: {
        type: 'video',
        sources,
        captions,
        poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
      },
    });
    expect(wrapper.contains('video')).toBe(true);
    expect(wrapper.contains('source')).toBe(true);
    expect(wrapper.contains('track')).toBe(true);
    expect(wrapper.find(Video).is(Video)).toBe(true);
    wrapper.destroy();
  })

  it('destroys html5 video', () => {
    const wrapper = mount(Plyrue, {
      stubs: {
        Video
      },
      attachToDocument: true,
      attrs: {
        type: 'video',
        sources,
        captions,
        poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
      },
    });

    wrapper.vm.player.destroy = jest.fn();
    wrapper.destroy();
    expect(wrapper.vm.player.destroy).toHaveBeenCalled();
  })


  it('emits event', () => {
    const wrapper = mount(Plyrue, {
      stubs: {
        Video
      },
      attachToDocument: true,
      attrs: {
        type: 'video',
        sources,
        captions,
        poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
      },
    });
    wrapper.vm.emitPlayerEvent({ type: 'play'})
    expect(wrapper.emitted().play).toBeTruthy();
  })

  it('sets video player attributes', () => {
    const wrapper = mount(Plyrue, {
      attrs: {
        type: 'video',
        sources,
        captions,
        poster,
        src,
        controls: false,
        autoplay: true
      },
    });

    const attributes = wrapper.find('video').attributes();
  
    expect(attributes.poster).toBe(poster);
    expect(attributes.src).toBe(src);
    expect(attributes.controls).toBe(undefined);
    expect(attributes.autoplay).toBe('autoplay');
    expect(attributes.sources).toBe(undefined);
    expect(attributes.captions).toBe(undefined);

    wrapper.destroy();
  })

  it('renders html5 video with source slot', () => {
    const wrapper = mount(Plyrue, {
      slots: {
        default: [`
          <source
            src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
            type="video/mp4"
            size="576"
          />
        `]
      },
      attrs: {
        poster,
        src,
        type: 'video',
      },
    });

    expect(wrapper.contains('video')).toBe(true);
    expect(wrapper.contains('source')).toBe(true);
  })

}) 

describe('Video component', () => {
  it('removes the sources and captions from attributes', () => {
    const wrapper = mount(Video, {
      attrs: {
        sources,
        captions,
        poster,
        src,
        controls: false,
        autoplay: true
      },
    });

    expect(wrapper.vm.videoAttributes.sources).toBe(undefined);
    expect(wrapper.vm.videoAttributes.captions).toBe(undefined);
    wrapper.destroy();
  })
})