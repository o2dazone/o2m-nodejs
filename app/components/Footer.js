/** @jsx h */

import css from 'styles/footer.scss';

import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import throttle from 'lodash.throttle';

import actions from 'actions';
import reducers from 'reducers';
import Info from './Info';
import Player from './Player';
import Duration from './Duration';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.onPercentUpdate = throttle(this.onPercentUpdate.bind(this), 100);
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
    const { player: { track: { id } }, search } = this.props;
    const results = search.results;
    let track = null;
    results.filter((r, i) => {
      if (r.id === id) {
        track = results[i + itr];
      }
    });

    return !!track && track;
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
    const { toggleShuffle, player: { shuffle } } = this.props;
    toggleShuffle(shuffle ? false : true );
  }

  render() {
    const { player } = this.props;

    if (!player.track) {
      return null;
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

export default connect(reducers, actions)(Footer);
