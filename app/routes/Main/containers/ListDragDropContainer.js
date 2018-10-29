import { connect } from 'react-redux';
import { setMain, removeVideo, playVideo, triggerSetting, saveBookmarkTitle } from '../modules/mainUI';
import ListDragDrop from '../components/ListDragDrop';

export const mapStateToProps = ({
  mainUI: {
    winMode,
    videoId,
    listVideo,
    bookmarkId,
    listBookmark,
    loopType,
  },
}) => ({
  visible: winMode === 'NORMAL' ? !false : false,
  videoId,
  titleBookmark: listBookmark.find(bookmark => bookmark.uuid === bookmarkId).title,
  listVideo,
  loopType,
});

export const mapDispatchToProps = (dispatch) => ({
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
    console.log('title:', title);
    dispatch(saveBookmarkTitle(title));
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
    console.log('vvvvvvvvvvv:', videoId);
    dispatch(playVideo({ videoId }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDragDrop);
