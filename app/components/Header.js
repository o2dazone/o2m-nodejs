import styles from '../styles/header.scss';

import React from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults } from '../actions/search';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(e) {
    // if the enter key was pressed...
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.fetchSearchResults(e.target.value);
    }
  }

  render() {
    return (
      <div className={styles.header}>
        <h1><a href="/">o2mdb</a></h1>
        <form action="/" method="get">
          <fieldset>
            <label>Search</label>
            <input type="text" placeholder="Search for songs" autoComplete="off" onKeyDown={this.onSearch} />
          </fieldset>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetchSearchResults: state.fetchSearchResults
  };
}

export default connect(mapStateToProps, { fetchSearchResults })(Header);
