import * as React from 'react';
import PropTypes from 'prop-types';
import { MdClose, MdRemove, MdSettings } from 'react-icons/md';
import DragDropListContainer from '../../containers/DragDropListContainer';
import PlayerContainer from '../../containers/PlayerContainer';
import { ICON_STYLES } from '../../../../constants/config';
import './mainView.global.scss';

class MainView extends React.Component {
  render() {
    const {
      onCloseWindow,
      onMinimizeWindow,
      onOpenSetting,
    } = this.props;
    return (
      <div>
        <div id="appHeader">
          <button type="button" onClick={onCloseWindow}><MdClose style={ICON_STYLES} /></button>
          <button type="button" onClick={onMinimizeWindow}><MdRemove style={ICON_STYLES} /></button>
          <button type="button" onClick={onOpenSetting} className="btnSetting"><MdSettings style={ICON_STYLES} /></button>
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

  onCloseWindow: PropTypes.func,
  onMinimizeWindow: PropTypes.func,
  onOpenSetting: PropTypes.func,
};

MainView.defaultProps = {
  onCloseWindow: () => {},
  onMinimizeWindow: () => {},
  onOpenSetting: () => {},
};

export default MainView;
