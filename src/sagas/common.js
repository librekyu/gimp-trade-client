import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { COMMON_ACTION } from '../reducer/common';
import Request from "./api";

function requestCommonAPI(data) {
  return Request({});
}

function* callRequestCommonAPI(action) {
  try {
    const response = yield call(requestCommonAPI, action.data);

    yield put({
      type: COMMON_ACTION.FAILURE,
      data: {
        response
      }
    });
  } catch (e) {
    yield put({
      type: COMMON_ACTION.FAILURE,
      error: e
    });
  }
}

function* watchRequestCommonAPI() {
  yield takeLatest(COMMON_ACTION.REQUEST, callRequestCommonAPI);
}

export default function* commonSagas() {
  yield all([
    fork(watchRequestCommonAPI),
  ]);
}
