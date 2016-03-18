import * as actionTypes from '../constants';

export default function player(state = { playing: false }, action) {
  const { type, track, streamUrl, toggle } = action;

  switch (type) {
  case actionTypes.PLAY_SONG:
    return {...state, track, playing: true};
  case actionTypes.RECEIVE_STREAM_URL:
    return {...state, streamUrl };
  case actionTypes.TOGGLE_PLAY_PAUSE:
    return {...state, playing: toggle };
  default:
    return state;
  }
}
