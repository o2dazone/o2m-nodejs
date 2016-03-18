import styles from '../styles/sectionHead.scss';

import React from 'react';

export default class SectionHead extends React.Component {
  constructor(props) {
    super(props);
  }

  makeTerm(query) {
    return (
      <span className={styles.term}>{query}</span>
    );
  }

  addAll() {
    // add all songs to queue
  }

  render() {
    const { search, queue } = this.props;

    if (search) {
      // has results
      if (search.hasResults) {
        return (
          <div className={styles.head}>
            {`You found ${search.results.length} results for`}
            <span className={styles.term}>{search.query}</span>
            {/* <span onClick={this.addAll} className={styles.addAll}>Add all songs to queue</span>*/}
          </div>
        );
      }

      if (search.query) {
        return (
          <div className={styles.head}>
            No results for {this.makeTerm(search.query)}
          </div>
        );
      }

      // no results
      return (
        <div className={styles.head} />
      );
    }

    // queue section head
    return (
      <div className={styles.head}>
        {queue ? `stuff` : 'Nothing in your queue'}
      </div>
    );
  }
}
