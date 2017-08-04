import styles from 'styles/header.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { player: { playing, track } } = this.props;

    // if the enter key was pressed...
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
      const query = e.target.value;
      makeHistory(query, playing ? track.id : null);
      this.props.fetchSearchResults(query);
    }
  }

  render() {
    const { query, search } = this.props;
    return (
      <div className={`${styles.container} ${search.query ? styles.small : ''}`}>
        <Logo size={150} className={styles.logo} />
        <form action="/" method="get">
          <fieldset>
            <label>Search</label>
            <input type="text" placeholder="Search for songs" autoComplete="off" onKeyDown={this.onSearch} defaultValue={query ? query : ''} />
          </fieldset>
        </form>
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
