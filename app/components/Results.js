import styles from 'styles/results.scss';

import React from 'react';
import { connect } from 'react-redux';

import { playSong } from 'actions/player';
import Songs from './Songs';
import SongLegends from './SongLegends';
import SectionHead from './SectionHead';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.onPlaySong = this.onPlaySong.bind(this);
  }

  // get exact song data from state result object
  onPlaySong(e) {
    const trackid = e.target.parentNode.dataset.trackid;
    const results = this.props.search.results;

    for (let i = 0; i < results.length; i++) {
      if (results[i].id === trackid) {
        this.props.playSong(results[i]);
        break;
      }
    }
  }

  render() {
    const { search, player } = this.props;

    return (
      <div className={styles.results}>
        <SectionHead search={search} />
        <SongLegends />
        {search.hasResults ? <Songs results={search.results} playingTrack={player.track ? player.track.id : null} onPlaySong={this.onPlaySong} /> : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    player: state.player
  };
}

export default connect(mapStateToProps, { playSong })(Results);
