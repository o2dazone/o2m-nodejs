import styles from 'styles/header.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults } from 'actions/search';
import { makeHistory } from 'helpers';

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
    const { query } = this.props;
    return (
      <div className={styles.header}>
        <h1>o2mdb</h1>
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
  const { player } = state;
  return {
    player
  };
};

export default connect(mapStateToProps, { fetchSearchResults })(Header);
