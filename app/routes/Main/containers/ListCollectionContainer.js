import { connect } from 'react-redux';
import { } from '../modules/mainUI';
import ListCollection from '../components/ListCollection';

export const mapStateToProps = ({
  mainUI: {
    winMode,
    bookmarkTitle,
    bookmarkList,
  },
}) => ({
  visible: winMode === 'NORMAL' ? !false : false,
  bookmarkTitle,
  bookmarkList,
});

export const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCollection);
