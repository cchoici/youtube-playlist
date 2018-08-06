// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { mainReducer as main } from '../routes/Main/modules/main';

const rootReducer = combineReducers({
  main,
  router
});

export default rootReducer;
