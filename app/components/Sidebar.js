import styles from '../styles/sidebar.scss';

import React from 'react';
import { connect } from 'react-redux';

import { toggleResults } from '../actions/results';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.onShowQueue = this.onShowQueue.bind(this);
    this.onShowResults = this.onShowResults.bind(this);
  }

  onShowResults(e) {
    e.preventDefault();
    this.props.toggleResults(true);
  }

  onShowQueue(e) {
    e.preventDefault();
    this.props.toggleResults(false);
  }

  render() {
    return (
      <div className={styles.sidebar}>
        <a href="#" onClick={this.onShowResults} selected>Search Results</a>

        {/*
        <a href="#" onClick={this.onShowQueue}>Music Queue</a>
        <a href="#" playlist data-dele-click="nav.showPlaylist">Playlists</a>
        <pl data-dele-click="search.latest">Latest Additions</pl>
        <pl data-dele-click="search.random">Start Listening</pl>
        */}
      </div>
    );
  }
}


function mapStateToProps() {
  return { };
}

export default connect(mapStateToProps, { toggleResults })(Sidebar);
