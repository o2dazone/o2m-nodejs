import css from 'styles/results.scss';

import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import { getTrackById } from 'helpers';
import AlbumArt from './AlbumArt';

import { playSong } from 'actions/player';

const Songs = ({ playSong, search, player }) => {
  const { results } = search;

  const mounted = useRef(null);
  const resultsContainer = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      resultsContainer.current.scrollTop = 0;
    }
  });

  const onPlaySong = ({ currentTarget }) => {
    const trackId = currentTarget.dataset.id;
    const track = getTrackById(trackId, search.results);
    playSong(track);
  };

  const makeTime = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const makeSongs = () => {
    const playingTrack = player.track?.id;

    return (
      results.map(({
        albumArtRef: { [0]: art } = {[0]: null}, // lol
        id,
        durationMillis,
        trackNumber,
        title,
        artist,
        album
      }) => (
        <div className={playingTrack === id ? css.playing : null} onClick={onPlaySong} key={id} data-id={id}>
          <AlbumArt className={css.aa} art={art?.url} />
          <div>
            <p>{`${trackNumber ? `${trackNumber}. ` : ''}`}{title}</p>
            <p>{`${artist}${album ? ' · ' + album : ''}`}</p>
            <p>{makeTime(durationMillis)}</p>
          </div>
        </div>
      ))
    );
  };

  const hasResults = results.length;

  return (
    <div id="rs" ref={resultsContainer} className={`${css.container} ${hasResults ? css.show : '' }`}>
      { hasResults ? makeSongs() : '' }
    </div>
  );
};

const stateToProps = ({ player, search }) => ({
  player,
  search
});

export default connect(stateToProps, {
  playSong
})(Songs);
