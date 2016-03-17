import React from 'react';
import styles from '../styles/player.scss';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.player}>
        <a href="#" className={styles.previous} data-dele-click="controls.previous">Previous Track</a>
        <a href="#" className={styles.playpause} pause data-dele-click="controls.playpause">Play/Pause</a>
        <a href="#" className={styles.next} data-dele-click="controls.next">Next Track</a>
        <a href="#" className={styles.shuffle} data-dele-click="controls.shuffle">Shuffle</a>
      </div>
    );
  }
}
