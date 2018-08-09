import { connect } from 'react-redux';
import { setMain, saveVideoList } from '../modules/main';
import SearchBar from '../components/SearchBar';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  onSwitchVideo: videoId => {
    dispatch(setMain({ videoId }));
  },
  onClickAdd: (isAddToList) => {
    dispatch(setMain({ isAddToList }));
  },
  onSaveVideoList: () => {
    dispatch(saveVideoList());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
