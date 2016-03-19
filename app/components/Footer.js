import styles from '../styles/footer.scss';

import React from 'react';
import { connect } from 'react-redux';
import { soundManager as sm } from 'soundmanager2';
import { togglePlayPause, toggleShuffle } from '../actions/player';
import Info from './Info';
import Player from './Player';
// import Duration from './Duration';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.onTogglePlayPause = this.onTogglePlayPause.bind(this);
    this.onToggleShuffle = this.onToggleShuffle.bind(this);
  }

  onTogglePlayPause() {
    const { togglePlayPause, player } = this.props;
    togglePlayPause(player.playing ? false : true );

    if (player.playing) {
      sm.getSoundById('smTrack').pause();
    } else {
      sm.getSoundById('smTrack').play();
    }
  }

  onToggleShuffle() {
    const { toggleShuffle, player } = this.props;
    toggleShuffle(player.shuffle ? false : true );
  }

  render() {
    const { player } = this.props;
    if (player.track) {
      return (
        <div className={styles.footer}>
          {/* <Duration />*/}
          <Info track={player.track} />
          <Player onTogglePlayPause={this.onTogglePlayPause} onToggleShuffle={this.onToggleShuffle} player={player} />
        </div>
      );
    }

    return (
      <div className={styles.footer}></div>
    );
  }
}


function mapStateToProps(state) {
  return {
    player: state.player
  };
}

export default connect(mapStateToProps, { togglePlayPause, toggleShuffle })(Footer);
