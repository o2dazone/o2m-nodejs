import css from 'styles/app.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';

import Header from './Header';
import Results from './Results';
import Footer from './Footer';
import LoadingIcon from './LoadingIcon';

import { receiveIndex, getSearchData } from 'actions/app';
import { receiveAutoplayTrackId } from 'actions/player';

let SEARCH_QUERY = '';

class App extends Component {
  componentWillMount() {
    this.props.getSearchData();
  }

  componentDidMount() {
    const { props: { receiveAutoplayTrackId } } = this;
    const query = parse(window.location.hash);
    const trackIdParam = query.track;
    SEARCH_QUERY = query.term;

    if (trackIdParam) {
      receiveAutoplayTrackId(trackIdParam);
    }
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

  render() {
    const { player, index } = this.props;

    if (!Object.keys(index).length) {
      return <LoadingIcon />;
    }

    return (
      <div className={css.container}>
        <Header query={SEARCH_QUERY} />
        <Results />
        { player.track || player.autoplay ? <Footer /> : '' }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { player, index } = state;
  return {
    player,
    index
  };
};

export default connect(mapStateToProps, { receiveAutoplayTrackId, receiveIndex, getSearchData })(App);
