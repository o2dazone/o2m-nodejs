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
    const { fetchStreamUrl, player } = this.props;

    sm.setup({
      'useHTML5Audio': true,
      'preferFlash': false,
      'debugMode': false,
      'forceUseGlobalHTML5Audio': true
    });

    sm.createSound({
      id: 'smTrack'
    });

    // make an initial fetch on mount
    fetchStreamUrl(player.track.id);
  }

  componentWillReceiveProps(nextState) {
    const { fetchStreamUrl, player } = this.props;

    if (nextState.player.track.id !== player.track.id) {
      fetchStreamUrl(nextState.player.track.id);
    }
  }

  componentDidUpdate(nextState) {
    const { player } = this.props;

    if (nextState.player.track.id === player.track.id) {
      sm.getSoundById('smTrack').play({
        url: player.streamUrl
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
