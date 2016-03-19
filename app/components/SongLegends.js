import styles from 'styles/songLegends.scss';

import React from 'react';

const SongLegends = () => {
  return (
    <div className={styles.songLegends}>
      <span className={styles.artSpacer}></span>
      <span className={styles.name}>Name</span>
      <span className={styles.artist}>Artist</span>
      <span className={styles.album}>Album</span>
    </div>
  );
};

export default SongLegends;
