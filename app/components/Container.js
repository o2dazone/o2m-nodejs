import styles from 'styles/container.scss';

import React from 'react';
import { connect } from 'react-redux';
import { isResultsVisible } from 'actions/results';
import Sidebar from './Sidebar';
import Results from './Results';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { search, isResultsVisible } = this.props;

    const results = search.query ? <Results /> : '';
    return (
      <div className={styles.container}>
        <Sidebar />
        {isResultsVisible ? results : ''}
        {/* {isResultsVisible ? results : <Playlists />}*/}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isResultsVisible: state.isResultsVisible,
    search: state.search
  };
}

export default connect(mapStateToProps, { isResultsVisible })(Container);
