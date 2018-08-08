import { connect } from 'react-redux';
import { setMain } from '../modules/main';
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
  onSwitchVideo: ({ videoId }) => {
    dispatch(setMain({ videoId }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropList);
