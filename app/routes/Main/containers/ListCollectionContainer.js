import { connect } from 'react-redux';
import { setMain, saveBookmarkTitle, playBookmark } from '../modules/mainUI';
import ListCollection from '../components/ListCollection';

export const mapStateToProps = ({
  mainUI: {
    winMode,
    listBookmark,
  },
}) => ({
  visible: winMode === 'NORMAL' ? !false : false,
  listBookmark,
});

export const mapDispatchToProps = (dispatch) => ({
  onDragEnd: (listBookmark) => {
    dispatch(setMain({ listBookmark }));
  },
  onEditSend: (titleBookmark) => {
    dispatch(saveBookmarkTitle(titleBookmark));
  },
  onSwitchBookmark: ({ uuid }) => {
    dispatch(playBookmark({ uuid }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCollection);
