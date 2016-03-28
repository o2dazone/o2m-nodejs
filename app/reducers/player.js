import * as actionTypes from 'constants';

export default function player(state = { playing: false, shuffle: false }, action) {
  const { type, track, streamUrl, toggle, percent, obj, begin } = action;

  switch (type) {
  case actionTypes.PLAY_SONG:
    return {...state, track, percent: 0, playing: true};
  case actionTypes.RECEIVE_STREAM_URL:
    return {...state, streamUrl, begin };
  case actionTypes.TOGGLE_PLAY_PAUSE:
    return {...state, playing: toggle };
  case actionTypes.TOGGLE_SHUFFLE:
    return {...state, shuffle: toggle };
  case actionTypes.UPDATE_PERCENT_PLAYED:
    return {...state, percent: percent };
  case actionTypes.ADD_PLAYER:
    return {...state, obj: obj };
  default:
    return state;
  }
}
