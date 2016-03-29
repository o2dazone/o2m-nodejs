import styles from 'styles/header.scss';

import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { fetchSearchResults } from 'actions/search';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(e) {
    // if the enter key was pressed...
    if (e.keyCode === 13) {
      e.preventDefault();
      hashHistory.replace(`search=${e.target.value}`);
      this.props.fetchSearchResults(e.target.value);
    }
  }

  render() {
    return (
      <div className={styles.header}>
        <h1>o2mdb</h1>
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

function mapStateToProps() {
  return { };
}

export default connect(mapStateToProps, { fetchSearchResults })(Header);
