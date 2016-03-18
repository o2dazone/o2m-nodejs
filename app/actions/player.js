import fetch from 'isomorphic-fetch';
import { TOGGLE_PLAY_PAUSE, PLAY_SONG, RECEIVE_STREAM_URL } from '../constants';

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

export function togglePlayPause(toggle) {
  return {
    type: TOGGLE_PLAY_PAUSE,
    toggle: toggle
  }
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
