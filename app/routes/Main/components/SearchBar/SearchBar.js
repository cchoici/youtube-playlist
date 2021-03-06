import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch, MdAdd, MdFavorite} from 'react-icons/md';
import { ICON_STYLES, MATCH_URL } from 'constants/config';
import styles from './searchBarStyles.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onEnter = this.onEnter.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  onEnter() {
    const { onSwitchVideo } = this.props;
    const { input } = this.state;
    const videoId = input && input.match(MATCH_URL)[1];
    onSwitchVideo(videoId);
  }
  onClickAdd() {
    const { onClickAdd, isAddToList } = this.props;
    onClickAdd(!isAddToList);
  }
  render() {
    const { visible } = this.props;
    const { input } = this.state;
    if (!visible) return null;
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
  visible: true,
  isAddToList: false,
  onSwitchVideo: () => {},
  onClickAdd: () => {},
};

SearchBar.propTypes = {
  visible: PropTypes.bool,
  isAddToList: PropTypes.bool,
  onSwitchVideo: PropTypes.func,
  onClickAdd: PropTypes.func,
};

export default SearchBar;
