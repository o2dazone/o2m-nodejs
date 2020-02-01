import css from 'styles/footer.scss';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import Info from './Info';
import Player from './Player';
import Duration from './Duration';

import { playSong, receiveAutoplayTrackId, togglePlayPause, fetchStreamUrl, toggleShuffle } from 'actions/player';
import { fetchAutoplayTrack } from 'actions/search';

const Footer = ({
  fetchAutoplayTrack,
  receiveAutoplayTrackId,
  toggleShuffle,
  playSong,
  togglePlayPause,
  player,
  search
}) => {
  const [ playerPercent, setPlayerPercent ] = useState(0);
  const audioModule = useRef(null);

  const {
    shuffle,
    playing,
    autoplay,
    begin = 0,
    track
  } = player;

  const { id, durationMillis } = track || {};

  const onTogglePlayPause = useCallback(() => {
    togglePlayPause(playing ? false : true );

    if (playing) {
      audioModule.current.pause();
    } else {
      audioModule.current.play();
    }
  }, [playing, togglePlayPause]);

  useEffect(() => {
    if (autoplay) {
      fetchAutoplayTrack(autoplay);
      receiveAutoplayTrackId(null);
    }
  }, [fetchAutoplayTrack, autoplay, receiveAutoplayTrackId]);

  const getTrack = itr => {
    const results = search.results;
    let track = null;
    results.filter((r, i) => {
      if (r.id === id) {
        track = results[i + itr];
      }
    });

    return !!track && track;
  };

  const onPercentUpdate = () => {
    setPlayerPercent(((audioModule.current.position + begin) / +durationMillis * 100).toFixed(2));
  };

  const onSoundCreated = obj => {
    audioModule.current = obj;
  };

  const onNextTrack = () => {
    if (shuffle) {
      const randomTrackId = Math.round(Math.random() * (search.results.length - 1));
      const randomTrack = search.results[randomTrackId];
      playSong(randomTrack);
    } else {
      const nextTrack = getTrack(+1);
      if (nextTrack) {
        playSong(nextTrack);
      }
    }
  };

  const onPreviousTrack = () => {
    const previousTrack = getTrack(-1);
    if (previousTrack) {
      playSong(previousTrack);
    }
  };

  const onToggleShuffle = () => {
    toggleShuffle(shuffle ? false : true );
  };

  if (!track) {
    return null;
  }

  return (
    <div className={css.container}>
      <Duration
        playerPercent={playerPercent}
        audioModule={audioModule.current} />

      <Info track={track} />

      <Player
        player={player}
        onSoundCreated={onSoundCreated}
        onNextTrack={onNextTrack}
        onPercentUpdate={onPercentUpdate}
        onPreviousTrack={onPreviousTrack}
        onTogglePlayPause={onTogglePlayPause}
        onToggleShuffle={onToggleShuffle} />
    </div>
  );
};

const stateToProps = ({ player, search }) => ({
  player,
  search
});

export default connect(stateToProps, {
  playSong,
  fetchStreamUrl,
  togglePlayPause,
  toggleShuffle,
  fetchAutoplayTrack,
  receiveAutoplayTrackId
})(Footer);
