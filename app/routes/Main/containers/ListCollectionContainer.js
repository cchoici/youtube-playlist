import { connect } from 'react-redux';
import { setMain, saveBookmarkTitle, playBookmark } from '../modules/mainUI';
import ListCollection from '../components/ListCollection';

export const mapStateToProps = ({
  mainUI: {
    winMode,
    bookmarkTitle,
    listBookmark,
  },
}) => ({
  visible: winMode === 'NORMAL' ? !false : false,
  bookmarkTitle,
  listBookmark,
});

export const mapDispatchToProps = (dispatch) => ({
  onDragEnd: (listBookmark) => {
    dispatch(setMain({ listBookmark }));
  },
  onEditSave: (bookmarkTitle) => {
    dispatch(saveBookmarkTitle(bookmarkTitle));
  },
  onSwitchBookmark: ({ uuid }) => {
    dispatch(playBookmark({ uuid }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCollection);
