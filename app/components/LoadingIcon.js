import React from 'react';
import styles from 'styles/loadingIcon.scss';

const LoadingIcon = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.cube1} />
      <div className={styles.cube2} />
    </div>
  );
};

export default LoadingIcon;
