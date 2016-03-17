import styles from '../styles/results.scss';

import React from 'react';
import { connect } from 'react-redux';

import Songs from './Songs';
import SongLegends from './SongLegends';
import SectionHead from './SectionHead';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { search } = this.props;

    return (
      <div className={styles.results}>
        <SectionHead search={search}></SectionHead>
        <SongLegends />
        {search.hasResults ? <Songs results={search.results} /> : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

export default connect(mapStateToProps, { })(Results);
