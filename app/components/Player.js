import styles from '../styles/player.scss';

import React from 'react';
import { connect } from 'react-redux';
import { fetchStreamUrl } from '../actions/player';
import AudioModule from './AudioModule';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchStreamUrl, player } = this.props;
    // make an initial fetch on mount
    fetchStreamUrl(player.track.id);
  }

  componentWillReceiveProps(nextState) {
    const { fetchStreamUrl, player } = this.props;
    if (nextState.player.track.id !== player.track.id) {
      fetchStreamUrl(nextState.player.track.id);
    }
  }

  render() {
    const { player, onToggleShuffle, onTogglePlayPause, onNextTrack, onPreviousTrack } = this.props;
    return (
      <div className={styles.player}>
        { player ? <AudioModule onNextTrack={onNextTrack} streamUrl={player.streamUrl} /> : ''}
        <a href="#" className={styles.previous} onClick={onPreviousTrack}>Previous Track</a>
        { player.playing ? <a href="#" className={styles.pause} onClick={onTogglePlayPause}>Pause</a> : <a href="#" className={styles.play} onClick={onTogglePlayPause}>Play</a>}
        <a href="#" className={styles.next} onClick={onNextTrack}>Next Track</a>
        { player.shuffle ? <a href="#" className={`${styles.shuffle} ${styles.on}`} onClick={onToggleShuffle}>Shuffle On</a> : <a href="#" className={styles.shuffle} onClick={onToggleShuffle}>Shuffle Off</a>}
      </div>
    );
  }
}

function mapStateToProps() {
  return { };
}


export default connect(mapStateToProps, { fetchStreamUrl })(Player);
