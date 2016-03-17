import React from 'react';
import styles from '../styles/queue.scss';

import SongLegends from './SongLegends';
import SectionHead from './SectionHead';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.queue}>
        <SectionHead />
        <SongLegends />
        <songs data-dele-click="song.prepare" data-dele-change="queue.counter"></songs>

      </div>
    );
  }
}
