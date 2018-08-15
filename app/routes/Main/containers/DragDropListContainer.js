import { connect } from 'react-redux';
import { setMain, removeVideo, playVideo } from '../modules/main';
import DragDropList from '../components/DragDropList';

export const mapStateToProps = ({
  main: {
    videoList,
  },
}) => ({
  videoList,
});

export const mapDispatchToProps = dispatch => ({
  onDragEnd: (items) => {
    dispatch(setMain({ videoList: items }));
  },
  onRemoveVideo: ({ videoId }) => {
    dispatch(removeVideo({ videoId }));
  },
  onSwitchVideo: ({ videoId }) => {
    dispatch(playVideo({ videoId }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropList);
