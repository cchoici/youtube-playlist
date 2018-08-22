import { connect } from 'react-redux';
import { setMain, removeVideo, playVideo, triggerSetting } from '../modules/main';
import DragDropList from '../components/DragDropList';

export const mapStateToProps = ({
  main: {
    winMode,
    videoList,
    loopType,
  },
}) => ({
  visible: winMode === 'NORMAL' ? !false : false,
  videoList,
  loopType,
});

export const mapDispatchToProps = dispatch => ({
  onLoopChange: (loopType) => {
    switch(loopType) {
      case 'SINGLE':
        dispatch(setMain({ loopType: 'ALL'}));
        break;
      default:
        dispatch(setMain({ loopType: 'SINGLE'}));
    }
  },
  onTriggerSetting: () => {
    dispatch(triggerSetting());
  },
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
