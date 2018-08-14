import { connect } from 'react-redux';
import { remote } from 'electron';
import { saveVideoList } from '../modules/main';
import MainView from '../components/MainView';

const closeWindow = () => {
  const win = remote.getCurrentWindow();
  win.close();
};
const minimizeWindow = () => {
  const win = remote.getCurrentWindow();
  win.minimize();
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onCloseWindow: () => (
    dispatch(saveVideoList())
      .then(() => closeWindow())
  ),
  onMinimizeWindow: () => {
    minimizeWindow();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
