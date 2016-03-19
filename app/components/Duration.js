import React from 'react';
import styles from 'styles/duration.scss';

export default class Duration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.duration}>
        <div className={styles.elapsed}>
          <div className={styles.time} />
        </div>
      </div>
    );
  }
}
