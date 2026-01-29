// ------------------------------
// Типы состояния и API плеера
// ------------------------------

import type { Track } from "../../track/model/types";

export type RepeatMode = "off" | "all" | "one";

export type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;

  queue: Track[];
  originalQueue: Track[];
  currentIndex: number;

  isShuffle: boolean;
  repeatMode: RepeatMode;
};

export type PlayerApi = {
  play: (track: Track, queue?: Track[]) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setVolume: (value: number) => void;
  seek: (time: number) => void;
  reset: () => void;
};
