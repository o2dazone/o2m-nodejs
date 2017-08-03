import styles from 'styles/results.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playSong } from 'actions/player';
import { getTrackById } from 'helpers';
import Songs from './Songs';

class Results extends Component {
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
    const trackId = e.currentTarget.dataset.trackid;
    const track = getTrackById(trackId, search.results);
    playSong(track);
  }

  render() {
    const { search, player } = this.props;
    return (
      <div className={styles.container}>
        {
          search.hasResults ?
            <Songs
              results={search.results}
              playingTrack={player.track ? player.track.id : null}
              onClickTrack={this.onPlaySong} /> : ''
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

export default connect(mapStateToProps, { playSong })(Results);
