import styles from 'styles/queue.scss';

import React from 'react';
import { connect } from 'react-redux';

import Songs from './Songs';
import SongLegends from './SongLegends';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { queue, player } = this.props;

    return (
      <div className={styles.queue}>
        <div className={styles.head}>
          {queue.hasResults ? <span>You have {queue.results.length} songs in your queue.</span> : <span>No songs in your queue</span>}
        </div>
        <SongLegends />
        {queue.hasResults ? <Songs results={queue.results} playingTrack={player.track ? player.track.id : null} onPlaySong={this.onPlaySong} /> : ''}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    queue: state.queue,
    player: state.player
  };
}

export default connect(mapStateToProps, { })(Queue);
