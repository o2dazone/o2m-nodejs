import styles from 'styles/results.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playSong } from 'actions/player';
import { getTrackById } from 'helpers';
import AlbumArt from './AlbumArt';

class Songs extends Component {
  constructor(props) {
    super(props);
    this.onPlaySong = this.onPlaySong.bind(this);
    this.fetching = null;
  }

  componentDidUpdate() {
    // reset fetch event on component update
    this.fetching = null;
  }

  onPlaySong(e) {
    const { playSong, search } = this.props;
    const trackId = e.currentTarget.dataset.id;
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
    const playingTrack = player.track ? player.track.id : null;
    return (
      results.map((track) => {
        const { id, albumArtRef, trackNumber, title, artist, album } = track;
        return (
          <div className={`${styles.track} ${playingTrack === id ? styles.playing : ''}`} onClick={this.onPlaySong} key={track.id} data-id={track.id}>
            <AlbumArt art={albumArtRef ? albumArtRef[0].url : null} />
            <div>
              <p>{`${trackNumber ? `${trackNumber}. ` : ''}`}{title}</p>
              <p>{`${artist}${album ? ' · ' + album : ''}`}</p>
              <p>{this.makeTime(track.durationMillis)}</p>
            </div>
          </div>
        );
      })
    );
  }

  render() {
    const { search: { hasResults } } = this.props;
    return (
      <div className={`${styles.container} ${hasResults ? styles.show : '' }`}>
        { hasResults ? this.makeSongs() : '' }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { search, player } = state;
  return {
    search,
    player
  };
};

export default connect(mapStateToProps, { playSong })(Songs);
