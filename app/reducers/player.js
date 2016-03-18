import * as actionTypes from '../constants';

export default function player(state = { playing: false }, action) {
  const { type, track, streamUrl } = action;

  switch (type) {
  case actionTypes.PLAY_SONG:
    return {...state, track, playing: true};
  case actionTypes.RECEIVE_STREAM_URL:
    return {...state, streamUrl }
  default:
    return state;
  }
}
