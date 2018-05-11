import {
  INDEX_URL,
  RECEIVE_INDEX
} from 'constants';

export const receiveIndex = index => ({
  type: RECEIVE_INDEX,
  index
});

export const getSearchData = () => dispatch => fetch(INDEX_URL)
  .then(response => response.json())
  .then(response => {
    dispatch(receiveIndex(response));
  });
