import fetch from 'isomorphic-fetch';
import { soundManager as sm } from 'soundmanager2';
import { TOGGLE_PLAY_PAUSE, RECEIVE_AUTOPLAY_TRACK, TOGGLE_SHUFFLE, PLAY_SONG, RECEIVE_STREAM_URL, STREAM_URL } from 'constants';

export const playSong = track => {
  return {
    type: PLAY_SONG,
    track
  };
};

const receiveStreamUrl = (url, begin) => {
  const streamUrl = begin ? url.replace(/begin\=\d+/, 'begin=' + begin) : url;
  return {
    type: RECEIVE_STREAM_URL,
    streamUrl,
    begin: begin || 0
  };
};

export const togglePlayPause = toggle => {
  return {
    type: TOGGLE_PLAY_PAUSE,
    toggle
  };
};

export const toggleShuffle = toggle => {
  return {
    type: TOGGLE_SHUFFLE,
    toggle
  };
};

export const receiveAutoplayTrackId = trackId => {
  return {
    type: RECEIVE_AUTOPLAY_TRACK,
    trackId
  };
};

export const fetchStreamUrl = (id, begin) => {
  return dispatch => {
    if (id) {
      if (sm.getSoundById('smTrack')) {
        sm.getSoundById('smTrack').pause();
      }

      const reqUrl = `${STREAM_URL}${id}`;
      return fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
          dispatch(receiveStreamUrl(response, begin));
        });
    }
  };
};
