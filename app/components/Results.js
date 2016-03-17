import styles from '../styles/results.scss';

import React from 'react';
import { connect } from 'react-redux';

import Songs from './Songs';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { search } = this.props;

    return (
      <div className={styles.results}>
        <sectionhead></sectionhead>

        <songlegends>
          <albumart></albumart>
          <name>Name</name>
          <artist>Artist</artist>
          <album>Album</album>
        </songlegends>

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
