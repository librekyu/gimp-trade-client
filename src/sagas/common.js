import { all, fork, takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { COMMON_ACTION } from '../reducer/common';

function requestCommonAPI(data) {
  return axios.create({});
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

function* watchGetAirQualityStatistics() {
  yield takeLatest(COMMON_ACTION.REQUEST, callRequestCommonAPI);
}

export default function* commonSagas() {
  yield all([
    fork(watchGetAirQualityStatistics),
  ]);
}
