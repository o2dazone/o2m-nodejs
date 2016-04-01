import styles from 'styles/container.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isResultsVisible } from 'actions/results';
import { toggleResults } from 'actions/results';
import Results from './Results';

class Container extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Results />
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

export default connect(mapStateToProps, { isResultsVisible, toggleResults })(Container);
