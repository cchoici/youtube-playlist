import { connect } from 'react-redux';
import { addVideoToList, playNextVideo } from '../modules/mainUI';
import Player from '../components/Player';

export const mapStateToProps = ({
  mainUI: {
    videoId,
    isAddToList,
    loopType,
  },
}) => ({
  videoId,
  isAddToList,
  loopType,
});

export const mapDispatchToProps = dispatch => ({
  onAddVideoToList: (info) => {
    dispatch(addVideoToList(info));
  },
  onPlayNextVideo: () => {
    dispatch(playNextVideo());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
