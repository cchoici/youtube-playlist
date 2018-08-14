import * as React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import MainViewContainer from './routes/Main/containers/MainViewContainer';

const App = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={MainViewContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape({}),
  history: PropTypes.shape({})
};

App.defaultProps = {
  store: {},
  history: {}
};

export default App;
