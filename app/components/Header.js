import styles from 'styles/header.scss';

import { Component } from 'preact';
import { connect } from 'preact-redux';
import { fetchSearchResults } from 'actions/search';
import { makeHistory } from 'helpers';
import { Logo } from 'icons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    const { query, fetchSearchResults } = this.props;
    fetchSearchResults(query);
  }

  onSearch(e) {
    const { player: { playing, track }, fetchSearchResults } = this.props;

    // if the enter key was pressed...
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
      const query = e.target.value;
      makeHistory(query, playing ? track.id : null);
      fetchSearchResults(query);
    }
  }

  render() {
    const { query, search } = this.props;
    return (
      <div className={`${styles.container} ${search.query ? styles.small : ''}`}>
        <Logo size={150} className={styles.logo} />
        <input type="text" placeholder="Search for songs" autoComplete="off" onKeyDown={this.onSearch} defaultValue={query || ''} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { player, search } = state;
  return {
    player,
    search
  };
};

export default connect(mapStateToProps, { fetchSearchResults })(Header);
