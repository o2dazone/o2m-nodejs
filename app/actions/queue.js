import { ADD_TO_QUEUE } from 'constants';

export function addToQueue(track) {
  return {
    type: ADD_TO_QUEUE,
    track: track
  };
}
