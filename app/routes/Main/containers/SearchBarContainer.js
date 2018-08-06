import { connect } from 'react-redux';
import { setMain } from '../modules/main';
import SearchBar from '../components/SearchBar';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  onSwitchVideo: videoId => {
    dispatch(setMain({ videoId }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
