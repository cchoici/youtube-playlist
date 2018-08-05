import React from 'react';
import styles from './searchBarStyles.scss';

const MATCH_URL = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onEnter = this.onEnter.bind(this);
  }

  onEnter() {
    const { input } = this.state;
    const id = input && input.match(MATCH_URL)[1];
    console.log('id:', id);
  }

  render() {
    console.log('searchBar');
    const { input } = this.state;
    return (
      <div className={styles.containerSearchBar}>
        <input
          type="text"
          value={input}
          onChange={(evt) => { this.setState({ input: evt.target.value }); }}
          placeholder="Input youtube link"
        />
        <button onClick={this.onEnter}>
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
