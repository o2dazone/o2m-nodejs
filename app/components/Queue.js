import React from 'react';
import styles from '../styles/queue.scss';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.queue}>
        <sectionhead>You have 0 songs in your queue</sectionhead>

        <songlegends>
          <albumart></albumart>
          <name>Name</name>
          <artist>Artist</artist>
          <album>Album</album>
        </songlegends>

        <songs data-dele-click="song.prepare" data-dele-change="queue.counter"></songs>

      </div>
    );
  }
}
