import type { PlyrueCaption, PlyrueSource } from '@/types';

const CDN = 'https://cdn.plyr.io/static/demo';

export const poster = `${CDN}/View_From_A_Blue_Moon_Trailer-HD.jpg`;
export const src = `${CDN}/View_From_A_Blue_Moon_Trailer-576p.mp4`;
export const audioSrc = `${CDN}/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3`;

export const sources: PlyrueSource[] = [
  {
    src: `${CDN}/View_From_A_Blue_Moon_Trailer-576p.mp4`,
    type: 'video/mp4',
    size: 576
  },
  {
    src: `${CDN}/View_From_A_Blue_Moon_Trailer-720p.mp4`,
    type: 'video/mp4',
    size: 720
  },
  {
    src: `${CDN}/View_From_A_Blue_Moon_Trailer-1080p.mp4`,
    type: 'video/mp4',
    size: 1080
  }
];

export const audioSources: PlyrueSource[] = [
  {
    src: `${CDN}/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3`,
    type: 'audio/mp3'
  },
  {
    src: `${CDN}/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg`,
    type: 'audio/ogg'
  }
];

export const captions: PlyrueCaption[] = [
  {
    label: 'Français',
    srclang: 'fr',
    src: `${CDN}/View_From_A_Blue_Moon_Trailer-HD.fr.vtt`
  }
];

export const youtubeUrl = 'https://www.youtube.com/watch?v=jNQXAC9IVRw';
export const vimeoUrl = 'https://vimeo.com/56282283';
