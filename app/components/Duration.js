import React from 'react';
import styles from 'styles/duration.scss';

export default class Duration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.duration}>
        <elapsed data-dele-click="controls.skip">
          <time></time>
        </elapsed>
      </div>
    );
  }
}
