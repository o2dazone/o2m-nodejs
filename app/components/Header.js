import css from 'styles/header.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { setQueryString } from 'helpers';
import { Logo } from 'icons';

import { fetchSearchResults } from 'actions/search';

const Header = ({ query, search, fetchSearchResults }) => {
  useEffect(() => {
    fetchSearchResults(query);
  }, [fetchSearchResults, query]);

  const onSearch = e => {
    // if the enter key was pressed...
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
      const term = e.target.value;
      setQueryString({ term });
      fetchSearchResults(term);
    }
  };

  return (
    <div className={`${css.container} ${search.query ? css.small : ''}`}>
      <Logo size={150} className={css.logo} />
      <input type="text" placeholder="Search for songs" autoComplete="off" onKeyDown={onSearch} defaultValue={query || ''} />
    </div>
  );
};

const stateToProps = ({ search }) => ({ search });

export default connect(stateToProps, {
  fetchSearchResults
})(Header);
