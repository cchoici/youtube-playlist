import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './app.global.scss';

ReactDom.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App'); // eslint-disable-line global-require
    ReactDom.render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
