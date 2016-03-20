import * as actionTypes from 'constants';

export default function queue(state = { hasResults: false, tracks: [] }, action) {
  const { type, track } = action;

  switch (type) {
  case actionTypes.ADD_TO_QUEUE:
    if (!(state.tracks.indexOf(track) + 1)) {
      state.tracks.push(track);
    }

    return {...state, hasResults: true};
  default:
    return state;
  }
}
