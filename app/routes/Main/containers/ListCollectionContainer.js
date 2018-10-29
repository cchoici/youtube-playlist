import { connect } from 'react-redux';
import { setMain, addBookmarkTitle, playBookmark } from '../modules/mainUI';
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
  onSwitchBookmark: ({ uuid }) => {
    dispatch(playBookmark({ uuid }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCollection);
