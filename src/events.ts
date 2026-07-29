/**
 * Every event Plyr can emit. Plyrue re-emits all of them on the component so
 * consumers can listen with plain `@play`, `@ready`, ... handlers.
 * @see https://github.com/sampotts/plyr#events
 */
export const PLYR_EVENTS = [
  // Standard media events
  'progress',
  'playing',
  'play',
  'pause',
  'timeupdate',
  'volumechange',
  'seeking',
  'seeked',
  'ratechange',
  'ended',
  'enterfullscreen',
  'exitfullscreen',
  'captionsenabled',
  'captionsdisabled',
  'languagechange',
  'controlshidden',
  'controlsshown',
  'ready',
  // HTML5 only
  'loadstart',
  'loadeddata',
  'loadedmetadata',
  'qualitychange',
  'canplay',
  'canplaythrough',
  'stalled',
  'waiting',
  'emptied',
  'cuechange',
  'error',
  // YouTube only
  'statechange',
  // Vimeo only
  'qualityrequested'
] as const;

export type PlyrEvent = (typeof PLYR_EVENTS)[number];
