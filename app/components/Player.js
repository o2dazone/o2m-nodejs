import css from 'styles/player.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setQueryString } from 'helpers';
import { PLAYER_ICON_SIZE } from 'constants';
import { parse } from 'query-string';
import AudioModule from './AudioModule';
import { Previous, Next, Shuffle, Play, Pause } from 'icons';

import { fetchStreamUrl } from 'actions/player';

const Player = ({
  onToggleShuffle,
  onTogglePlayPause,
  onNextTrack,
  onPercentUpdate,
  onSoundCreated,
  onPreviousTrack,
  fetchStreamUrl,
  player
}) => {
  useEffect(() => {
    // make an initial fetch on mount
    const query = parse(window.location.hash);
    const track = query.track;

    setQueryString({ track });
    fetchStreamUrl(track);
  }, [fetchStreamUrl]);

  useEffect(() => {
    const track = player.track.id;
    setQueryString({ track });
    fetchStreamUrl(track);
  }, [fetchStreamUrl, player.track.id]);

  return (
    <div className={css.container}>
      { player && <AudioModule onSoundCreated={onSoundCreated} onNextTrack={onNextTrack} onPercentUpdate={onPercentUpdate} streamUrl={player.streamUrl} /> }
      <Previous size={PLAYER_ICON_SIZE + 8} className={css.prevNext} onClick={onPreviousTrack} color="#ddd" />

      { player.playing
        ? <Pause size={PLAYER_ICON_SIZE} onClick={onTogglePlayPause} color="#ddd" />
        : <Play size={PLAYER_ICON_SIZE} onClick={onTogglePlayPause} color="#ddd" />
      }

      <Next size={PLAYER_ICON_SIZE + 8} className={css.prevNext} onClick={onNextTrack} color="#ddd" />
      <Shuffle size={PLAYER_ICON_SIZE} onClick={onToggleShuffle} color={player.shuffle ? '#3179a1' : '#ddd'} />
    </div>
  );
};

const stateToProps = ({ player }) => ({ player });

export default connect(stateToProps, {
  fetchStreamUrl
})(Player);
