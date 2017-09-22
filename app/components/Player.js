import styles from 'styles/player.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeHistory } from 'helpers';
import { PLAYER_ICON_SIZE } from 'constants';
import { fetchStreamUrl } from 'actions/player';
import AudioModule from './AudioModule';
import { Previous, Next, Shuffle, Play, Pause } from 'icons';

class Player extends Component {
  componentWillMount() {
    const { fetchStreamUrl, player, search: { query } } = this.props;
    // make an initial fetch on mount
    makeHistory(query, player.track.id);
    fetchStreamUrl(player.track.id);
  }

  componentWillReceiveProps(nextState) {
    const { fetchStreamUrl, player, search: { query } } = this.props;
    if (nextState.player.track.id !== player.track.id) {
      fetchStreamUrl(nextState.player.track.id);
      makeHistory(query, nextState.player.track.id);
    }
  }

  render() {
    const { player, onToggleShuffle, onTogglePlayPause, onNextTrack, onPercentUpdate, onSoundCreated, onPreviousTrack } = this.props;

    return (
      <div className={styles.container}>
        { player ? <AudioModule onSoundCreated={onSoundCreated} onNextTrack={onNextTrack} onPercentUpdate={onPercentUpdate} streamUrl={player.streamUrl} /> : ''}
        <Previous size={PLAYER_ICON_SIZE + 8} className={styles.prevNext} onClick={onPreviousTrack} color="#ddd" />

        { player.playing ?
          <Pause size={PLAYER_ICON_SIZE} onClick={onTogglePlayPause} color="#ddd" /> :
          <Play size={PLAYER_ICON_SIZE} onClick={onTogglePlayPause} color="#ddd" />
        }

        <Next size={PLAYER_ICON_SIZE + 8} className={styles.prevNext} onClick={onNextTrack} color="#ddd" />
        <Shuffle size={PLAYER_ICON_SIZE} onClick={onToggleShuffle} color={player.shuffle ? '#3179a1' : '#ddd'} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { search } = state;
  return {
    search
  };
};


export default connect(mapStateToProps, { fetchStreamUrl })(Player);
