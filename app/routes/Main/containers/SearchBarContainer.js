import { connect } from 'react-redux';
import { setMain } from '../modules/mainUI';
import SearchBar from '../components/SearchBar';

export const mapStateToProps = ({
  mainUI: {
    winMode,
    isAddToList
  }
}) => ({
  visible: winMode === 'NORMAL'? !false : false,
  isAddToList,
});

export const mapDispatchToProps = dispatch => ({
  onSwitchVideo: videoId => {
    dispatch(setMain({ videoId }));
  },
  onClickAdd: (isAddToList) => {
    dispatch(setMain({ isAddToList }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
