import styles from '../styles/container.scss';

import React from 'react';
import { connect } from 'react-redux';
import { isResultsVisible } from '../actions/results';
import Sidebar from './Sidebar';
import Results from './Results';
import Queue from './Queue';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <Sidebar />
        {this.props.isResultsVisible ? <Results /> : <Queue />}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isResultsVisible: state.isResultsVisible
  };
}

export default connect(mapStateToProps, { isResultsVisible })(Container);
