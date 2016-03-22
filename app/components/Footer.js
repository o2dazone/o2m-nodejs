import styles from 'styles/footer.scss';

import React from 'react';
import { connect } from 'react-redux';
import { togglePlayPause, toggleShuffle, playSong, updatePercentPlayed, addPlayer } from 'actions/player';
import Info from './Info';
import Player from './Player';
import Duration from './Duration';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.onTogglePlayPause = this.onTogglePlayPause.bind(this);
    this.onToggleShuffle = this.onToggleShuffle.bind(this);
    this.onNextTrack = this.onNextTrack.bind(this);
    this.onPercentUpdate = this.onPercentUpdate.bind(this);
    this.onPreviousTrack = this.onPreviousTrack.bind(this);
    this.onSoundCreated = this.onSoundCreated.bind(this);
  }

  onTogglePlayPause() {
    const { togglePlayPause, player } = this.props;
    togglePlayPause(player.playing ? false : true );

    if (player.playing) {
      player.obj.pause();
    } else {
      player.obj.play();
    }
  }

  getTrack(itr) {
    const { player, search } = this.props;

    const trackid = player.track.id;
    const results = search.results;
    let followingTrack;

    for (let i = 0; i < results.length; i++) {
      if (results[i].id === trackid && (followingTrack = results[i + itr])) {
        return followingTrack;
      }
    }
  }

  onPercentUpdate() {
    const { updatePercentPlayed, player } = this.props;
    const percent = Math.floor(player.obj.position / player.track.durationMillis * 100);

    if (percent !== player.percent) {
      updatePercentPlayed(percent);
    }
  }

  onSoundCreated(obj) {
    this.props.addPlayer(obj);
  }

  onNextTrack() {
    const { player, playSong, search } = this.props;

    if (player.shuffle) {
      const randomTrack = Math.round(Math.random() * (search.results.length - 1));
      playSong(search.results[randomTrack]);
    } else {
      const nextTrack = this.getTrack(+1);
      if (nextTrack) {
        playSong(nextTrack);
      }
    }
  }

  onPreviousTrack() {
    const previousTrack = this.getTrack(-1);
    if (previousTrack) {
      this.props.playSong(previousTrack);
    }
  }

  onToggleShuffle() {
    const { toggleShuffle, player } = this.props;
    toggleShuffle(player.shuffle ? false : true );
  }

  render() {
    const { player } = this.props;

    return (
      <div className={styles.footer}>
        <Duration />
        <Info track={player.track} />
        <Player player={player} onSoundCreated={this.onSoundCreated} onNextTrack={this.onNextTrack} onPercentUpdate={this.onPercentUpdate} onPreviousTrack={this.onPreviousTrack} onTogglePlayPause={this.onTogglePlayPause} onToggleShuffle={this.onToggleShuffle} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    player: state.player,
    search: state.search
  };
}

export default connect(mapStateToProps, { togglePlayPause, toggleShuffle, playSong, updatePercentPlayed, addPlayer })(Footer);
