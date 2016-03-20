import styles from 'styles/sidebar.scss';

import React from 'react';
import { connect } from 'react-redux';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isResultsVisible, onShowResults } = this.props;

    return (
      <div className={styles.sidebar}>
        <span className={isResultsVisible ? styles.selected : ''} onClick={onShowResults}>Search Results</span>
        <span>Playlists</span>
        <span className={styles.playlist}>Latest Additions</span>
        <span className={styles.playlist}>Start Listening</span>
      </div>
    );
  }
}

function mapStateToProps() {
  return { };
}

export default connect(mapStateToProps, { })(Sidebar);
