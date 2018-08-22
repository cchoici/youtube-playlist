import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDrawer from 'react-drawer';
import { MdClose, MdRemove, MdCallToAction, MdBrandingWatermark } from 'react-icons/md';
import DragDropListContainer from '../../containers/DragDropListContainer';
import PlayerContainer from '../../containers/PlayerContainer';
import { ICON_STYLES } from '../../../../constants/config';
import icon from './icon.png';
import './mainView.global.scss';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.onPlayWindow = this.onPlayWindow.bind(this);
  }
  onPlayWindow() {
    const { winMode, onPlayWindow } = this.props;
    onPlayWindow(winMode);
  }
  render() {
    const {
      winMode,
      isDrawerOpen,
      onCloseWindow,
      onMinimizeWindow,
    } = this.props;
    return (
      <div>
        <div id="appHeader">
          <img alt='app icon' src={icon} />
          <div className='space'>YouTube Playlist</div>
          <button type="button" onClick={this.onPlayWindow}>
            {
              winMode ==='PLAYER'
              ? <MdCallToAction style={ICON_STYLES} />
              : <MdBrandingWatermark style={ICON_STYLES} />
            }
          </button>
          <button type="button" onClick={onMinimizeWindow}><MdRemove style={ICON_STYLES} /></button>
          <button type="button" onClick={onCloseWindow}><MdClose style={ICON_STYLES} /></button>
        </div>
        <div id="appContent" className={classNames({ 'playerMode': winMode === 'PLAYER'})}>
          <div className='appCols'>
            <PlayerContainer />
            <DragDropListContainer />
          </div>
        </div>
        <ReactDrawer
          open={isDrawerOpen}
          position="right"
          onClose={() => {}}
          noOverlay
        >
          Setting
        </ReactDrawer>
      </div>
    );
  }
} 

MainView.propTypes = {
  winMode: PropTypes.oneOf(['NORMAL', 'PLAYER']),
  isDrawerOpen: PropTypes.bool,
  onCloseWindow: PropTypes.func,
  onMinimizeWindow: PropTypes.func,
  onPlayWindow: PropTypes.func,
};

MainView.defaultProps = {
  winMode: 'NORMAL',
  isDrawerOpen: true,
  onCloseWindow: () => {},
  onMinimizeWindow: () => {},
  onPlayWindow: () => {},
};

export default MainView;
