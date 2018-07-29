/* @flow */
import * as React from 'react';
import DragDropList from './components/DragDropList';

const App = () => (
  <div id="container">
    <div id="header">
      <button type="button" onClick={() => { window.close(); }}>
        X
      </button>
      <button type="button" onClick={() => { window.close(); }}>
        -
      </button>
    </div>
    <div className="content">
      <DragDropList />
    </div>
  </div>
);

export default App;
