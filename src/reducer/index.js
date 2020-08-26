import { combineReducers } from 'redux';
import common from './common';
import gimp from './gimp';

const rootReducer = combineReducers({
  common,
  gimp,
});

export default rootReducer;
