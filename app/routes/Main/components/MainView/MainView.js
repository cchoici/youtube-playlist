import * as React from 'react';
import { remote } from 'electron';
// import PropTypes from 'prop-types';
import DragDropListContainer from '../../containers/DragDropListContainer';
import PlayerContainer from '../../containers/PlayerContainer';
import SearchBarContainer from '../../containers/SearchBarContainer';

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

const MainView = () => (
  <div>
    <div id="appHeader">
      <button type="button" onClick={closeWindow}>
        X
      </button>
      <button type="button" onClick={minimizeWindow}>
        -
      </button>
    </div>
    <div id="appContent">
      <SearchBarContainer />
      <div className="appCols">
        <PlayerContainer />
        <DragDropListContainer />
      </div>
    </div>
  </div>
);

export default MainView;
