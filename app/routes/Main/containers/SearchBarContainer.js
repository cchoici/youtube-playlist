import { connect } from 'react-redux';
import { setMain, addVideoToList, saveVideoList } from '../modules/main';
import SearchBar from '../components/SearchBar';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  onSwitchVideo: videoId => {
    dispatch(setMain({ videoId }));
  },
  onAddVideoToList: () => {
    dispatch(addVideoToList());
  },
  onSaveVideoList: () => {
    dispatch(saveVideoList());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
