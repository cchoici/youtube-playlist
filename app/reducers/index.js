// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { mainUIReducer as mainUI } from '../routes/Main/modules/mainUI';

const rootReducer = combineReducers({
  mainUI,
  router
});

export default rootReducer;
