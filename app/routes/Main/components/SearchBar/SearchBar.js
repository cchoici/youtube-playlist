import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch, MdAdd, MdFavorite} from 'react-icons/md';
import { ICON_STYLES } from '../../../../constants/config';
import styles from './searchBarStyles.scss';

const MATCH_URL = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      isAddToList: false,
    };
    this.onEnter = this.onEnter.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  onEnter() {
    const { onSwitchVideo } = this.props;
    const { input } = this.state;
    const videoId = input && input.match(MATCH_URL)[1];
    console.log('videoId:', videoId);
    onSwitchVideo(videoId);
  }
  onClickAdd() {
    const { onClickAdd } = this.props;
    const { isAddToList } = this.state;
    this.setState({ isAddToList: !isAddToList });
    onClickAdd(!isAddToList);
  }
  render() {
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
        <button onClick={this.onEnter} className={styles.btnSearch}><MdSearch style={ICON_STYLES} /></button>
        <button onClick={this.onClickAdd}><MdAdd style={ICON_STYLES} /><MdFavorite style={ICON_STYLES} /></button>
        <div className={styles.space} />
      </div>
    );
  }
}
SearchBar.defaultProps = {
  onSwitchVideo: () => {},
  onClickAdd: () => {},
};

SearchBar.propTypes = {
  onSwitchVideo: PropTypes.func,
  onClickAdd: PropTypes.func,
};

export default SearchBar;
