import styles from 'styles/container.scss';

import React from 'react';
import { connect } from 'react-redux';
import { isResultsVisible } from 'actions/results';
import { toggleResults } from 'actions/results';
import Results from './Results';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.onShowResults = this.onShowResults.bind(this);
  }

  onShowResults(e) {
    e.preventDefault();
    this.props.toggleResults(true);
  }

  render() {
    return (
      <div className={styles.container}>
        <Results onShowResults={this.onShowResults} />
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
