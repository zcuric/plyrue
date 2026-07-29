/// <reference types="plyr" />

export type PlyrueType = 'default' | 'audio' | 'video' | 'embed';

export interface PlyrueSource {
  src: string;
  type?: string;
  size?: string | number;
  [key: string]: unknown;
}

export interface PlyrueCaption {
  src: string;
  label?: string;
  srclang?: string;
  default?: boolean;
  [key: string]: unknown;
}

export interface PlyruePluginOptions {
  /** Component name to register globally. Defaults to `plyrue`. */
  name?: string;
}

export type PlyrPlayer = Plyr;
