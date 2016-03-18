import fetch from 'isomorphic-fetch';
import { PLAY_SONG, RECEIVE_STREAM_URL } from '../constants';

export function playSong(track) {
  return {
    type: PLAY_SONG,
    track: track
  };
}

function receiveStreamUrl(streamUrl) {
  return {
    type: RECEIVE_STREAM_URL,
    streamUrl: streamUrl
  };
}

export function fetchStreamUrl(id) {
  return function (dispatch) {
    if (id) {
      const reqUrl = `/stream?id=${id}`;
      return fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
          dispatch(receiveStreamUrl(response));
        });
    }
  };
}
