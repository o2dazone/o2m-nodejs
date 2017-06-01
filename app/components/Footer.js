import styles from 'styles/footer.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import { fetchAutoplayTrack } from 'actions/search';
import { togglePlayPause, receiveAutoplayTrackId, toggleShuffle, playSong, updatePercentPlayed, addPlayer, fetchStreamUrl } from 'actions/player';
import Info from './Info';
import Player from './Player';
import Duration from './Duration';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.onTogglePlayPause = this.onTogglePlayPause.bind(this);
    this.onToggleShuffle = this.onToggleShuffle.bind(this);
    this.onNextTrack = this.onNextTrack.bind(this);
    this.onPercentUpdate = throttle(this.onPercentUpdate.bind(this), 1000);
    this.onPreviousTrack = this.onPreviousTrack.bind(this);
    this.onSoundCreated = this.onSoundCreated.bind(this);
    this.onDurationClicked = this.onDurationClicked.bind(this);
    this.audioModule = null;
  }

  componentDidMount() {
    const { player, fetchAutoplayTrack, receiveAutoplayTrackId } = this.props;

    if (player.autoplay) {
      fetchAutoplayTrack(player.autoplay);
      receiveAutoplayTrackId(null);
    }
  }

  onTogglePlayPause() {
    const { togglePlayPause, player } = this.props;
    togglePlayPause(player.playing ? false : true );

    if (player.playing) {
      this.audioModule.pause();
    } else {
      this.audioModule.play();
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
    updatePercentPlayed(((this.audioModule.position + player.begin) / player.track.durationMillis * 100).toFixed(1));
  }

  onSoundCreated(obj) {
    this.audioModule = obj;
  }

  onNextTrack() {
    const { player, playSong, search } = this.props;

    if (player.shuffle) {
      const randomTrackId = Math.round(Math.random() * (search.results.length - 1));
      const randomTrack = search.results[randomTrackId];
      playSong(randomTrack);
    } else {
      const nextTrack = this.getTrack(+1);
      if (nextTrack) {
        playSong(nextTrack);
      }
    }
  }

  onDurationClicked(e) {
    const { player, fetchStreamUrl, togglePlayPause } = this.props;
    let target = e.target;

    if (target.dataset.timer) {
      target = target.parentNode;
    }

    if (target.dataset.elapsed) {
      target = target.parentNode;
    }

    togglePlayPause(true);
    fetchStreamUrl(player.track.id, Math.round(e.clientX / target.clientWidth * player.track.durationMillis));
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

    if (!player.track) {
      return (
        <div />
      );
    }

    return (
      <div className={styles.footer}>
        <Duration audioModule={this.audioModule} onDurationClicked={this.onDurationClicked} />
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

export default connect(mapStateToProps, { receiveAutoplayTrackId, fetchAutoplayTrack, togglePlayPause, toggleShuffle, playSong, updatePercentPlayed, addPlayer, fetchStreamUrl })(Footer);
