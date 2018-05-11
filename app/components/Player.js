import css from 'styles/player.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQueryString } from 'helpers';
import { PLAYER_ICON_SIZE } from 'constants';
import actions from 'actions';
import {rootReducers as reducers} from 'reducers';
import AudioModule from './AudioModule';
import { Previous, Next, Shuffle, Play, Pause } from 'icons';

class Player extends Component {
  componentWillMount() {
    const { fetchStreamUrl, player } = this.props;
    // make an initial fetch on mount
    const track = player.track.id;
    setQueryString({ track });
    fetchStreamUrl(track);
  }

  componentWillReceiveProps(nextState) {
    const { fetchStreamUrl, player } = this.props;
    if (nextState.player.track.id !== player.track.id) {
      const track = nextState.player.track.id;
      setQueryString({ track });
      fetchStreamUrl(track);
    }
  }

  render() {
    const {
      player,
      onToggleShuffle,
      onTogglePlayPause,
      onNextTrack,
      onPercentUpdate,
      onSoundCreated,
      onPreviousTrack
    } = this.props;

    return (
      <div className={css.container}>
        { player ? <AudioModule onSoundCreated={onSoundCreated} onNextTrack={onNextTrack} onPercentUpdate={onPercentUpdate} streamUrl={player.streamUrl} /> : ''}
        <Previous size={PLAYER_ICON_SIZE + 8} className={css.prevNext} onClick={onPreviousTrack} color="#ddd" />

        { player.playing ?
          <Pause size={PLAYER_ICON_SIZE} onClick={onTogglePlayPause} color="#ddd" /> :
          <Play size={PLAYER_ICON_SIZE} onClick={onTogglePlayPause} color="#ddd" />
        }

        <Next size={PLAYER_ICON_SIZE + 8} className={css.prevNext} onClick={onNextTrack} color="#ddd" />
        <Shuffle size={PLAYER_ICON_SIZE} onClick={onToggleShuffle} color={player.shuffle ? '#3179a1' : '#ddd'} />
      </div>
    );
  }
}

export default connect(reducers, actions)(Player);
