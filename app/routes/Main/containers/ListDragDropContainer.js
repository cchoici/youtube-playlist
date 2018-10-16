import { connect } from 'react-redux';
import { setMain, removeVideo, playVideo, triggerSetting } from '../modules/mainUI';
import ListDragDrop from '../components/ListDragDrop';

export const mapStateToProps = ({
  mainUI: {
    winMode,
    bookmarkTitle,
    listVideo,
    loopType,
  },
}) => ({
  visible: winMode === 'NORMAL' ? !false : false,
  bookmarkTitle,
  listVideo,
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
  onDragEnd: (listVideo) => {
    dispatch(setMain({ listVideo }));
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
)(ListDragDrop);
