import styles from '../styles/sectionHead.scss';

import React from 'react';

export default class SectionHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { search } = this.props;

    if (search && search.hasResults) {
      return (
        <div className={styles.head}>
          {`You found ${search.results.length} results for`}
          <span className={styles.term}>{search.query}</span>
        </div>
      );
    } else {
      return (
        <div className={styles.head}></div>
      );
    }
  }
}
