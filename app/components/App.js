import css from 'styles/app.scss';

import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { parse } from 'query-string';

import Header from './Header';
import Results from './Results';
import Footer from './Footer';
import LoadingIcon from './LoadingIcon';

import { getSearchData } from 'actions/app';
import { receiveAutoplayTrackId } from 'actions/player';

const App = ({ getSearchData, receiveAutoplayTrackId, player: { track, autoplay }, index }) => {
  const SEARCH_QUERY = useRef(null);

  useEffect(() => {
    getSearchData();
    const query = parse(window.location.hash);
    const trackId = query.track;

    SEARCH_QUERY.current = query.term;
    if (trackId) {
      receiveAutoplayTrackId(trackId);
    }
  }, [getSearchData, receiveAutoplayTrackId]);

  if (!Object.keys(index).length) {
    return <LoadingIcon />;
  }

  return (
    <div className={css.container}>
      <Header query={SEARCH_QUERY.current} />
      <Results />
      { track || autoplay ? <Footer /> : '' }
    </div>
  );
};

const stateToProps = ({ player, index }) => ({
  player,
  index
});

const ConnectedApp = connect(stateToProps, {
  getSearchData,
  receiveAutoplayTrackId
})(App);

export default hot(ConnectedApp);

