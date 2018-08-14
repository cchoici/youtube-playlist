import { connect } from 'react-redux';
import { saveVideoList } from '../modules/main';
import MainView from '../components/MainView';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  onSaveVideoList: () => {
    dispatch(saveVideoList());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
