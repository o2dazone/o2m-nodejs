import * as actionTypes from 'constants';

export default function search(state = { results: [] }, action) {
  const { type, results, query } = action;

  switch (type) {
  case actionTypes.RECEIVE_SEARCH_RESULTS:
    const sorted = results.sort((a, b) => {
      if (a.album === b.album) {
        return a.trackNumber - b.trackNumber;
      } else if (a.album > b.album) {
        return 1;
      } else if (a.album < b.album) {
        return -1;
      }
    });

    return {...state, results: sorted, query};
  default:
    return state;
  }
}
