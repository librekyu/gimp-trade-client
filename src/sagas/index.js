import { all, call, fork } from 'redux-saga/effects';
import axios from 'axios';
import commonSagas from './common';

axios.defaults.baseURL = 'http://localhost:3001/api';

export default function* rootSaga() {
  yield all([
    fork(commonSagas),
  ]);
}
