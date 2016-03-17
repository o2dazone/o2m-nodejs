import React from 'react';
import styles from '../styles/footer.scss';

import Info from './Info';
import Player from './Player';
import Duration from './Duration';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.footer}>
        <Info />
        <Player />
        <Duration />
      </div>
    );
  }
}
