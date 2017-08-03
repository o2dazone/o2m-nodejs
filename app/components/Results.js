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
    this.makeSongs = this.makeSongs.bind(this);
    this.makeTime = this.makeTime.bind(this);
    this.fetching = null;
  }

  componentDidUpdate() {
    // reset fetch event on component update
    this.fetching = null;
  }

  onPlaySong(e) {
    const { playSong, search } = this.props;
    const trackId = e.currentTarget.dataset.trackid;
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
        return (
          <div className={playingTrack === track.id ? styles.playing : null} onClick={this.onPlaySong} key={track.id} data-trackid={track.id}>
            <AlbumArt art={track.albumArtRef ? track.albumArtRef[0].url : null} />
            <div>
              <div>{track.title}</div>
              <div>{`${track.artist}${track.album ? ' · ' + track.album : ''}`}</div>
              <div>{this.makeTime(track.durationMillis)}</div>
            </div>
          </div>
        );
      })
    );
  }

  render() {
    const { search } = this.props;
    return (
      <div className={styles.container}>
        {
          search.hasResults ? <div className={styles.songs}>{this.makeSongs()}</div> : ''
        }
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
