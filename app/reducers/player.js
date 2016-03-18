import * as actionTypes from '../constants';

export default function player(state = { playing: false }, action) {
  const { type, track } = action;

  switch (type) {
  case actionTypes.PLAY_SONG:
    return {...state, track, playing: true};
  default:
    return state;
  }
}
