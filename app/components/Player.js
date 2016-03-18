import styles from '../styles/player.scss';

import React from 'react';
import { connect } from 'react-redux';
import { fetchStreamUrl, togglePlayPause, toggleShuffle } from '../actions/player';
import AudioModule from './AudioModule';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.onTogglePlayPause = this.onTogglePlayPause.bind(this);
    this.onToggleShuffle = this.onToggleShuffle.bind(this);
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

  onTogglePlayPause() {
    const { togglePlayPause, player } = this.props;
    togglePlayPause(player.playing ? false : true );
  }

  onToggleShuffle() {
    const { toggleShuffle, player } = this.props;
    toggleShuffle(player.shuffle ? false : true );
  }

  render() {
    const { player } = this.props;
    return (
      <div className={styles.player}>
        { player ? <AudioModule streamUrl={player.streamUrl} trackId={player.track.id} /> : ''}
        <a href="#" className={styles.previous}>Previous Track</a>
        <a href="#" className={styles.playpause} onClick={this.onTogglePlayPause}>Play/Pause</a>
        <a href="#" className={styles.next}>Next Track</a>
        <a href="#" className={styles.shuffle} onClick={this.onToggleShuffle}>Shuffle</a>
      </div>
    );
  }
}

function mapStateToProps() {
  return { };
}


export default connect(mapStateToProps, { fetchStreamUrl, togglePlayPause, toggleShuffle })(Player);
