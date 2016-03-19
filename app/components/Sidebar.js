import styles from 'styles/sidebar.scss';

import React from 'react';
import { connect } from 'react-redux';

import { toggleResults } from 'actions/results';

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
    const { isResultsVisible } = this.props;

    return (
      <div className={styles.sidebar}>
        <span className={isResultsVisible ? styles.selected : ''} onClick={this.onShowResults}>Search Results</span>
        <span className={!isResultsVisible ? styles.selected : ''} onClick={this.onShowQueue}>Music Queue</span>
        <span>Playlists</span>
        <span className={styles.playlist}>Latest Additions</span>
        <span className={styles.playlist}>Start Listening</span>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isResultsVisible: state.isResultsVisible
  };
}

export default connect(mapStateToProps, { toggleResults })(Sidebar);
