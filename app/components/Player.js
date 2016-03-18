import styles from '../styles/player.scss';

import React from 'react';
import { connect } from 'react-redux';
import { soundManager as sm } from 'soundmanager2';
import { fetchStreamUrl } from '../actions/player';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    sm.setup({
      'useHTML5Audio': true,
      'preferFlash': false,
      'debugMode': false
    });

    sm.createSound({
      id: 'smTrack'
    });

    // make an initial fetch on mount
    this.props.fetchStreamUrl(this.props.player.track.id);
  }

  componentWillReceiveProps(nextState) {
    if (nextState.player.track.id !== this.props.player.track.id) {
      this.props.fetchStreamUrl(nextState.player.track.id);
    }
  }

  componentDidUpdate(nextState) {
    if (nextState.player.track.id === this.props.player.track.id) {
      sm.getSoundById('smTrack').play({
        url: this.props.player.streamUrl
      });
    }
  }

  render() {
    return (
      <div className={styles.player}>
        <a href="#" className={styles.previous}>Previous Track</a>
        <a href="#" className={styles.playpause} pause>Play/Pause</a>
        <a href="#" className={styles.next}>Next Track</a>
        <a href="#" className={styles.shuffle}>Shuffle</a>
      </div>
    );
  }
}

function mapStateToProps() {
  return { };
}


export default connect(mapStateToProps, { fetchStreamUrl })(Player);
