import { all, fork } from 'redux-saga/effects';
import commonSagas from './common';
import gimp from './gimp';

export default function* rootSaga() {
  yield all([
    fork(commonSagas),
    fork(gimp),
  ]);
}
