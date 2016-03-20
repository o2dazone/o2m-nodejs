import fetch from 'isomorphic-fetch';
import { soundManager as sm } from 'soundmanager2';
import { TOGGLE_PLAY_PAUSE, TOGGLE_SHUFFLE, PLAY_SONG, RECEIVE_STREAM_URL, UPDATE_PERCENT_PLAYED } from 'constants';


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
  };
}

export function toggleShuffle(toggle) {
  return {
    type: TOGGLE_SHUFFLE,
    toggle: toggle
  };
}

export function updatePercentPlayed(percent) {
  return {
    type: UPDATE_PERCENT_PLAYED,
    percent: percent
  };
}

export function fetchStreamUrl(id) {
  return function (dispatch) {
    if (id) {
      if (sm.getSoundById('smTrack')) {
        sm.getSoundById('smTrack').pause();
      }

      const reqUrl = `/stream?id=${id}`;
      return fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
          dispatch(receiveStreamUrl(response));
        });
    }
  };
}
