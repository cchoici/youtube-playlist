import { connect } from 'react-redux';
import { addVideoToList } from '../modules/main';
import Player from '../components/Player';

export const mapStateToProps = ({
  main: {
    videoId,
    isAddToList,
  },
}) => ({
  videoId,
  isAddToList,
});

export const mapDispatchToProps = dispatch => ({
  onAddVideoToList: (info) => {
    dispatch(addVideoToList(info));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
