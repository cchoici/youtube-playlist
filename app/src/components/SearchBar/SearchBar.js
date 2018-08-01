import React from 'react';
import './searchBarStyles.scss';

class SearchBar extends React.Component {
  render() {
    console.log('searchBar');
    return (
      <div className="containerSearchBar">
        <input
          type="text"
          placeholder="Input youtube link"
        />
        <button>
          ENTER
        </button>
        <button>
          +
        </button>
      </div>
    );
  }
}

export default SearchBar;
