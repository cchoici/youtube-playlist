import { connect } from 'react-redux';
import { setMain, addBookmarkTitle, playBookmark, removeBookmark } from '../modules/mainUI';
import ListCollection from '../components/ListCollection';

export const mapStateToProps = ({
  mainUI: {
    winMode,
    listBookmark,
    bookmarkId,
  },
}) => ({
  visible: winMode === 'NORMAL' ? !false : false,
  listBookmark,
  bookmarkId,
});

export const mapDispatchToProps = (dispatch) => ({
  onDragEnd: (listBookmark) => {
    dispatch(setMain({ listBookmark }));
  },
  onEditSend: (titleBookmark) => {
    dispatch(addBookmarkTitle(titleBookmark));
  },
  onRemoveBookmark: ({ uuid }) => {
    // dispatch(setMain({ modal: { key: 'BOOKMARK_DELETE', uuid } }));
    dispatch(removeBookmark({ uuid }));
  },
  onSwitchBookmark: ({ uuid }) => {
    dispatch(playBookmark({ uuid }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCollection);
