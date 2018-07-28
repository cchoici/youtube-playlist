/* @flow */

import React from 'react';
import DragDropList from './components/DragDropList';

const App = () => (
  <div>
    <div className="container">
      <DragDropList />
    </div>
    <button
      type="button"
      id="close"
      onClick={() => {
        window.close();
      }}
    >
      X
    </button>
  </div>
);

export default App;
