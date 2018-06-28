/** @jsx h */
import css from 'styles/app.scss';

import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { parse } from 'query-string';

import Header from './Header';
import Results from './Results';
import Footer from './Footer';
import LoadingIcon from './LoadingIcon';

import reducers from 'reducers';
import actions from 'actions';

class App extends Component {
  static SEARCH_QUERY;

  componentWillMount() {
    this.props.getSearchData();
  }

  componentDidMount() {
    const query = parse(window.location.hash);
    const trackIdParam = query.track;
    App.SEARCH_QUERY = query.term;

    if (trackIdParam) {
      this.props.receiveAutoplayTrackId(trackIdParam);
    }
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1;
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

export default connect(reducers, actions)(App);
