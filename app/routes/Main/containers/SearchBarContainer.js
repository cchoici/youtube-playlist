import { connect } from 'react-redux';
import { setMain } from '../modules/main';
import SearchBar from '../components/SearchBar';

export const mapStateToProps = ({
  main: { isAddToList }
}) => ({
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
