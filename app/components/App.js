import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import styles from 'styles/app.scss';

import Header from './Header';
import Container from './Container';
import Footer from './Footer';
import LoadingIcon from './LoadingIcon';

import { receiveIndex, getSearchData } from 'actions/app';
import { fetchAutoplayTrack } from 'actions/search';

class App extends Component {
  constructor(props) {
    super(props);
    this.searchQuery = null;
    this.locQuery = null;
    this.getQueryParams = this.getQueryParams.bind(this);
  }

  componentWillMount() {
    this.props.getSearchData();
  }

  componentDidMount() {
    this.getQueryParams();
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.index).length !== Object.keys(this.props.index).length) {
      const trackId = (this.isInArray('track', this.locQuery)) ? this.locQuery[this.locQuery.indexOf('track') + 1] : null;

      if (trackId) {
        this.props.fetchAutoplayTrack(trackId);
      }
    }
  }

  getQueryParams() {
    const splitter = /\&|\=|\?\_k=\w+/;
    this.locQuery = window.location.hash.replace(/^#\/?|\/$/g, '').split('/')[0].split(splitter);
    this.searchQuery = (this.isInArray('search', this.locQuery)) ? this.locQuery[this.locQuery.indexOf('search') + 1] : null;
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

  render() {
    const { player, store, index } = this.props;

    if (!Object.keys(index).length) {
      return <LoadingIcon />;
    }

    return (
      <Provider store={store}>
        <div className={styles.wrap}>
          <Header query={this.searchQuery} />
          <Container />
          { player.track ? <Footer /> : '' }
        </div>
      </Provider>
    );
  }
}


function mapStateToProps(state) {
  return {
    player: state.player,
    index: state.index
  };
}

export default connect(mapStateToProps, { fetchAutoplayTrack, receiveIndex, getSearchData })(App);
