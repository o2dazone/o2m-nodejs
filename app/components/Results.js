import css from 'styles/results.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'actions';
import {rootReducers as reducers} from 'reducers';
import { getTrackById } from 'helpers';
import AlbumArt from './AlbumArt';

class Songs extends Component {
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
    const playingTrack = player.track ? player.track.id : null;
    return (
      results.map(({ id, albumArtRef, durationMillis, trackNumber, title, artist, album }) => (
        <div className={playingTrack === id ? css.playing : null} onClick={this.onPlaySong} key={id} data-id={id}>
          <AlbumArt art={albumArtRef ? albumArtRef[0].url : null} />
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
      <div className={`${css.container} ${hasResults ? css.show : '' }`}>
        { hasResults ? this.makeSongs() : '' }
      </div>
    );
  }
}

export default connect(reducers, actions)(Songs);
