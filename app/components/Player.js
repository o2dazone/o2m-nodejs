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
    const { fetchStreamUrl } = this.props;
    if (nextState.player.track.id !== this.props.player.track.id) {
      fetchStreamUrl(nextState.player.track.id);
    }
  }

  render() {
    const { player, onToggleShuffle, onTogglePlayPause } = this.props;
    return (
      <div className={styles.player}>
        { player ? <AudioModule streamUrl={player.streamUrl} /> : ''}
        <a href="#" className={styles.previous}>Previous Track</a>
        { player.playing ? <a href="#" className={styles.pause} onClick={onTogglePlayPause}>Pause</a> : <a href="#" className={styles.play} onClick={onTogglePlayPause}>Play</a>}
        <a href="#" className={styles.next}>Next Track</a>
        { player.shuffle ? <a href="#" className={`${styles.shuffle} ${styles.on}`} onClick={onToggleShuffle}>Shuffle On</a> : <a href="#" className={styles.shuffle} onClick={onToggleShuffle}>Shuffle Off</a>}
      </div>
    );
  }
}

function mapStateToProps() {
  return { };
}


export default connect(mapStateToProps, { fetchStreamUrl })(Player);
