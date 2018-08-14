import * as React from 'react';
import { remote } from 'electron';
import PropTypes from 'prop-types';
import { MdClose, MdRemove, MdSave, MdSettings } from 'react-icons/md';
import DragDropListContainer from '../../containers/DragDropListContainer';
import PlayerContainer from '../../containers/PlayerContainer';
import { ICON_STYLES } from '../../../../constants/config';
import './mainView.global.scss';

// const onResize = () => {
//   const win = remote.getCurrentWindow();
//   win.resize();
// };
// window.addEventListener('resize', onResize);
const closeWindow = () => {
  const win = remote.getCurrentWindow();
  win.close();
};
const minimizeWindow = () => {
  const win = remote.getCurrentWindow();
  win.minimize();
};

class MainView extends React.Component {
  render() {
    const { onSaveVideoList, onOpenSetting } = this.props;
    return (
      <div>
        <div id="appHeader">
          <button type="button" onClick={closeWindow}><MdClose style={ICON_STYLES} /></button>
          <button type="button" onClick={minimizeWindow}><MdRemove style={ICON_STYLES} /></button>
          <button type="button" onClick={onOpenSetting} className="btnSetting"><MdSettings style={ICON_STYLES} /></button>
          <button type="button" onClick={onSaveVideoList}><MdSave style={ICON_STYLES} /></button>
        </div>
        <div id="appContent">
          <div className="appCols">
            <PlayerContainer />
            <DragDropListContainer />
          </div>
        </div>
      </div>
    );
  }
} 

MainView.propTypes = {
  onSaveVideoList: PropTypes.func,
  onOpenSetting: PropTypes.func,
};

MainView.defaultProps = {
  onSaveVideoList: () => {},
  onOpenSetting: () => {},
};

export default MainView;
