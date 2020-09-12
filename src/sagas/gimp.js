import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { GIMP_ACTION } from '../reducer/gimp';
import Request from './api';

function requestMarginsAPI(data) {
    return Request({
        url: `/api/gimps?from=${data.fromDate}&to=${data.toDate}`,
        method: 'get',
    });
}

function* callRequestMargins(action) {
    try {
        const response = yield call(requestMarginsAPI, action.data);

        yield put({
            type: GIMP_ACTION.GIMP_MARGINS_SUCCESS,
            data: {
                response
            }
        });
    } catch (e) {
        yield put({
            type: GIMP_ACTION.GIMP_MARGINS_FAILURE,
            error: e
        });
    }
}

function* watchRequestMargins() {
    yield takeLatest(GIMP_ACTION.GIMP_MARGINS_REQUEST, callRequestMargins);
}

export default function* gimpSagas() {
    yield all([
        fork(watchRequestMargins),
    ]);
}
