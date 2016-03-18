import { PLAY_SONG } from '../constants';

export function playSong(track) {
  return {
    type: PLAY_SONG,
    track: track
  };
}
