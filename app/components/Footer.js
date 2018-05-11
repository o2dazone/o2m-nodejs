import css from 'styles/footer.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import { fetchAutoplayTrack } from 'actions/search';
import { togglePlayPause, receiveAutoplayTrackId, toggleShuffle, playSong, addPlayer, fetchStreamUrl } from 'actions/player';
import Info from './Info';
import Player from './Player';
import Duration from './Duration';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.onPercentUpdate = throttle(this.onPercentUpdate.bind(this), 250);
    this.audioModule = null;
    this.state = {
      playerPercent: 0
    };
  }

  componentDidMount() {
    const { player, fetchAutoplayTrack, receiveAutoplayTrackId } = this.props;
    document.addEventListener('keydown', this.handleKeyDown.bind(this));

    if (player.autoplay) {
      fetchAutoplayTrack(player.autoplay);
      receiveAutoplayTrackId(null);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown = e => {
    if (e.target.tagName !== 'INPUT') {
      if (e.key === ' ') {
        e.preventDefault();
        this.onTogglePlayPause();
      }
    }
  }

  onTogglePlayPause = () => {
    const { togglePlayPause, player } = this.props;
    togglePlayPause(player.playing ? false : true );

    if (player.playing) {
      this.audioModule.pause();
    } else {
      this.audioModule.play();
    }
  }

  getTrack = itr => {
    const { player, search } = this.props;

    const trackid = player.track.id;
    const results = search.results;

    for (let i = 0; i < results.length; i++) {
      if (results[i].id === trackid) {
        return results[i + itr];
      }
    }
  }

  onPercentUpdate = () => {
    const { player } = this.props;
    this.setState({
      playerPercent: ((this.audioModule.position + player.begin) / player.track.durationMillis * 100).toFixed(2)
    });
  }

  onSoundCreated = obj => {
    this.audioModule = obj;
  }

  onNextTrack = () => {
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

  onDurationClicked = e => {
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

  onPreviousTrack = () => {
    const previousTrack = this.getTrack(-1);
    if (previousTrack) {
      this.props.playSong(previousTrack);
    }
  }

  onToggleShuffle = () => {
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
      <div className={css.container}>
        <Duration
          playerPercent={this.state.playerPercent}
          audioModule={this.audioModule}
          onDurationClicked={this.onDurationClicked} />

        <Info track={player.track} />

        <Player
          player={player}
          onSoundCreated={this.onSoundCreated}
          onNextTrack={this.onNextTrack}
          onPercentUpdate={this.onPercentUpdate}
          onPreviousTrack={this.onPreviousTrack}
          onTogglePlayPause={this.onTogglePlayPause}
          onToggleShuffle={this.onToggleShuffle} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { player, search } = state;
  return {
    player,
    search
  };
};

export default connect(mapStateToProps, { receiveAutoplayTrackId, fetchAutoplayTrack, togglePlayPause, toggleShuffle, playSong, addPlayer, fetchStreamUrl })(Footer);
