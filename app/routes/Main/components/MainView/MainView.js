import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MdClose, MdRemove, MdCallToAction, MdBrandingWatermark } from 'react-icons/md';
import DragDropListContainer from '../../containers/DragDropListContainer';
import PlayerContainer from '../../containers/PlayerContainer';
import { ICON_STYLES } from '../../../../constants/config';
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
      onCloseWindow,
      onMinimizeWindow,
    } = this.props;
    console.log('winMode:', winMode);
    return (
      <div>
        <div id="appHeader">
          <button type="button" onClick={onCloseWindow}><MdClose style={ICON_STYLES} /></button>
          <button type="button" onClick={onMinimizeWindow}><MdRemove style={ICON_STYLES} /></button>
          <button type="button" onClick={this.onPlayWindow}>
            {
              winMode ==='PLAYER'
              ? <MdCallToAction style={ICON_STYLES} />
              : <MdBrandingWatermark style={ICON_STYLES} />
            }
          </button>
        </div>
        <div id="appContent" className={classNames({ 'playerMode': winMode === 'PLAYER'})}>
          <div className='appCols'>
            <PlayerContainer />
            <DragDropListContainer />
          </div>
        </div>
      </div>
    );
  }
} 

MainView.propTypes = {
  winMode: PropTypes.oneOf(['NORMAL', 'PLAYER']),
  onCloseWindow: PropTypes.func,
  onMinimizeWindow: PropTypes.func,
  onPlayWindow: PropTypes.func,
};

MainView.defaultProps = {
  winMode: 'NORMAL',
  onCloseWindow: () => {},
  onMinimizeWindow: () => {},
  onPlayWindow: () => {},
};

export default MainView;
