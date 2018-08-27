import { connect } from 'react-redux';
import { remote, ipcRenderer } from 'electron';
import { setMain, savePlayerData, triggerSetting } from '../modules/main';
import MainView from '../components/MainView';

const closeWindow = () => {
  const win = remote.getCurrentWindow();
  win.close();
};
const minimizeWindow = () => {
  const win = remote.getCurrentWindow();
  win.minimize();
};
const playWindow = (mode) => {
  const win = remote.getCurrentWindow();
  ipcRenderer.send(mode, win.getPosition());
};

const mapStateToProps = ({
  main: {
    winMode,
    isDrawerOpen,
  }
}) => ({
  winMode,
  isDrawerOpen,
});

const mapDispatchToProps = dispatch => ({
  onCloseWindow: () => (

    dispatch(savePlayerData())
      .then(() => closeWindow())
  ),
  onMinimizeWindow: () => {
    minimizeWindow();
  },
  onPlayWindow: (mode) => {
    const winMode = mode === 'PLAYER' ? 'NORMAL' : 'PLAYER';
    dispatch(setMain({ winMode, isDrawerOpen: false }));
    playWindow(`${winMode.toLowerCase()}-mode`);
  },
  onTriggerSetting: () => {
    dispatch(triggerSetting());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
