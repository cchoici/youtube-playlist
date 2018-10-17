import { connect } from 'react-redux';
import { setMain, removeVideo, playVideo, triggerSetting, saveListTitle } from '../modules/mainUI';
import ListDragDrop from '../components/ListDragDrop';

export const mapStateToProps = ({
  mainUI: {
    winMode,
    titleBookmark,
    listVideo,
    loopType,
  },
}) => ({
  visible: winMode === 'NORMAL' ? !false : false,
  titleBookmark,
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
  onEditSend: (title) => {
    dispatch(saveListTitle(title));
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
