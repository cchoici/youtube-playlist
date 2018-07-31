/* @flow */
import * as React from 'react';
import { remote } from 'electron';
import DragDropList from './components/DragDropList';
import Player from './components/Player';

// window.addEventListener('resize', onResize);
// const onResize = () => {
//   const win = remote.getCurrentWindow();
//   win.resize();
// };
const closeWindow = () => {
  const win = remote.getCurrentWindow();
  win.close();
};
const minimizeWindow = () => {
  const win = remote.getCurrentWindow();
  win.minimize();
};

const App = () => (
  <div id="container">
    <div id="header">
      <button type="button" onClick={closeWindow}>
        X
      </button>
      <button type="button" onClick={minimizeWindow}>
        -
      </button>
    </div>
    <div className="content">
      <Player />
      <DragDropList />
    </div>
  </div>
);

export default App;
