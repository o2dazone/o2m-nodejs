import css from 'styles/app.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';

import Header from './Header';
import Results from './Results';
import Footer from './Footer';
import LoadingIcon from './LoadingIcon';

import { getSearchData } from 'actions/app';
import { receiveAutoplayTrackId } from 'actions/player';

class App extends Component {
  static SEARCH_QUERY;

  componentDidMount() {
    this.props.getSearchData();
    const query = parse(window.location.hash);
    const trackId = query.track;

    App.SEARCH_QUERY = query.term;
    if (trackId) {
      this.props.receiveAutoplayTrackId(trackId);
    }
  }

  render() {
    const { player: { track, autoplay }, index } = this.props;

    if (!Object.keys(index).length) {
      return <LoadingIcon />;
    }

    return (
      <div className={css.container}>
        <Header query={App.SEARCH_QUERY} />
        <Results />
        { track || autoplay ? <Footer /> : '' }
      </div>
    );
  }
}

const stateToProps = ({ player, index }) => ({
  player,
  index
});

export default connect(stateToProps, {
  getSearchData,
  receiveAutoplayTrackId
})(App);
