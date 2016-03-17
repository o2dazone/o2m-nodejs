import React from 'react';
import styles from '../styles/info.scss';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.info}>
        <albumart></albumart>
        <name></name>
        <artistalbum></artistalbum>
      </div>
    );
  }
}
