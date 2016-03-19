import styles from 'styles/results.scss';

import React from 'react';
import { connect } from 'react-redux';

import { playSong } from 'actions/player';
import Songs from './Songs';
import SongLegends from './SongLegends';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.onPlaySong = this.onPlaySong.bind(this);
    this.makeTerm = this.makeTerm.bind(this);
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

  makeTerm(query) {
    return (
      <span className={styles.term}>{query}</span>
    );
  }

  render() {
    const { search, player } = this.props;

    return (
      <div className={styles.results}>
        <div className={styles.head}>
          { search.hasResults ? <span>You found {search.results.length} results for {this.makeTerm(search.query)}</span> : ''}
          { search.query && !search.hasResults ? <span>No results for {this.makeTerm(search.query)}</span> : ''}
          { !search.query && !search.hasResults ? <span /> : '' }
          {/* { !search ? <span>Nothing in your queue</span> : '' }*/}
        </div>

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
