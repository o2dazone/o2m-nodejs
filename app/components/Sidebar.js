import styles from 'styles/sidebar.scss';

import React from 'react';

const Sidebar = ({ isResultsVisible, onShowResults }) => {
  return (
    <div className={styles.sidebar}>
      <span className={isResultsVisible ? styles.selected : ''} onClick={onShowResults}>Search Results</span>
      <span>Playlists</span>
      <span className={styles.playlist}>Latest Additions</span>
      <span className={styles.playlist}>Start Listening</span>
    </div>
  );
};

export default Sidebar;
