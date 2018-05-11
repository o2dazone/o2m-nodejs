import * as actionTypes from 'constants';

export default function player(state = { playing: false, shuffle: false }, action) {
  const {
    type,
    track,
    streamUrl,
    toggle,
    begin,
    trackId
  } = action;

  switch (type) {
  case actionTypes.PLAY_SONG:
    return {...state, track, playing: true};
  case actionTypes.RECEIVE_STREAM_URL:
    return {...state, streamUrl, begin };
  case actionTypes.TOGGLE_PLAY_PAUSE:
    return {...state, playing: toggle };
  case actionTypes.TOGGLE_SHUFFLE:
    return {...state, shuffle: toggle };
  case actionTypes.RECEIVE_AUTOPLAY_TRACK:
    return {...state, autoplay: trackId };
  default:
    return state;
  }
}
