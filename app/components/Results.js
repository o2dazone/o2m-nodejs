import css from 'styles/results.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTrackById } from 'helpers';
import AlbumArt from './AlbumArt';

import { playSong } from 'actions/player';

class Songs extends Component {
  componentDidUpdate() {
    this.refs.results.scrollTop = 0;
  }

  onPlaySong = ({ currentTarget }) => {
    const { playSong, search } = this.props;
    const trackId = currentTarget.dataset.id;
    const track = getTrackById(trackId, search.results);
    playSong(track);
  }

  makeTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  makeSongs() {
    const { player, search: { results } } = this.props;
    const playingTrack = player.track?.id;

    return (
      results.map(({
        albumArtRef: { [0]: art } = {[0]: null}, // lol
        id,
        durationMillis,
        trackNumber,
        title,
        artist,
        album
      }) => (
        <div className={playingTrack === id ? css.playing : null} onClick={this.onPlaySong} key={id} data-id={id}>
          <AlbumArt className={css.aa} art={art?.url} />
          <div>
            <p>{`${trackNumber ? `${trackNumber}. ` : ''}`}{title}</p>
            <p>{`${artist}${album ? ' · ' + album : ''}`}</p>
            <p>{this.makeTime(durationMillis)}</p>
          </div>
        </div>
      ))
    );
  }

  render() {
    const { search: { results } } = this.props;
    const hasResults = results.length;

    return (
      <div ref="results" className={`${css.container} ${hasResults ? css.show : '' }`}>
        { hasResults ? this.makeSongs() : '' }
      </div>
    );
  }
}

const stateToProps = ({ player, search }) => ({
  player,
  search
});

export default connect(stateToProps, {
  playSong
})(Songs);
