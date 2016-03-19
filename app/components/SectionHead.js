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
    const { search } = this.props;

    return (
      <div className={styles.head}>
        { search.hasResults ? <span>You found {search.results.length} results for <span className={styles.term}>{search.query}</span></span> : ''}
        { search.query && !search.hasResults ? <span>No results for {this.makeTerm(search.query)}</span> : ''}
        { !search.query && !search.hasResults ? <span /> : '' }
        {/* { !search ? <span>Nothing in your queue</span> : '' }*/}
      </div>
    );
  }
}
