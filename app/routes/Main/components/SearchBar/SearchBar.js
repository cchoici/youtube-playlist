import React from 'react';
import PropTypes from 'prop-types';
import styles from './searchBarStyles.scss';

const MATCH_URL = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.onEnter = this.onEnter.bind(this);
  }

  onEnter() {
    const { onSwitchVideo } = this.props;
    const { input } = this.state;
    const videoId = input && input.match(MATCH_URL)[1];
    console.log('videoId:', videoId);
    onSwitchVideo(videoId);
  }

  render() {
    console.log('searchBar');
    const { input } = this.state;
    return (
      <div className={styles.containerSearchBar}>
        <input
          type="text"
          value={input}
          onChange={evt => {
            this.setState({ input: evt.target.value });
          }}
          placeholder="Input youtube link"
        />
        <button onClick={this.onEnter}>ENTER</button>
        <button>+</button>
      </div>
    );
  }
}
SearchBar.defaultProps = {
  onSwitchVideo: () => {}
};

SearchBar.propTypes = {
  onSwitchVideo: PropTypes.func
};

export default SearchBar;
