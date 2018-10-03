import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Sidebar from 'react-sidebar';
import { MdClose, MdRemove, MdCallToAction, MdBrandingWatermark } from 'react-icons/md';
import ListDragDropContainer from 'routes/Main/containers/ListDragDropContainer';
import ListCollectionContainer from 'routes/Main/containers/ListCollectionContainer';
import PlayerContainer from 'routes/Main/containers/PlayerContainer';
import { ICON_STYLES } from 'constants/config';
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
      onTriggerSetting,
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
        <Sidebar
          rootClassName="root"
          sidebarClassName="sidebar"
          contentClassName={isDrawerOpen ? 'sidebarLeft' : undefined}
          sidebar={<ListCollectionContainer />}
          open={isDrawerOpen}
          docked={isDrawerOpen}
          transitions
          pullRight
          onSetOpen={onTriggerSetting}
        >
          <div id="appContent" className={classNames({ 'playerMode': winMode === 'PLAYER'})}>
           
            <PlayerContainer />
            <ListDragDropContainer />
           
          </div>
        </Sidebar>
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
  onTriggerSetting: PropTypes.func,
};

MainView.defaultProps = {
  winMode: 'NORMAL',
  isDrawerOpen: true,
  onCloseWindow: () => {},
  onMinimizeWindow: () => {},
  onPlayWindow: () => {},
  onTriggerSetting: () => {},
};

export default MainView;
