/* @flow */
import * as React from 'react';
import { remote } from 'electron';
// import { Provider } from 'react-redux';
import DragDropList from './components/DragDropList';
import Player from './components/Player';
import SearchBar from './components/SearchBar';

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
      <SearchBar />
      <div className="appCols">
        <Player />
        <DragDropList />
      </div>
    </div>
  </div>
);

export default App;
