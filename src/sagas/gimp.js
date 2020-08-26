import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { GIMP_ACTION } from '../reducer/gimp';
import Request from './api';

function requestMarginsAPI() {
    return Request({
        url: '/api/margins',
        method: 'get',
    });
}

function* callRequestMarginsAPI(action) {
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

function* watchRequestMarginsAPI() {
    yield takeLatest(GIMP_ACTION.REQUEST, callRequestMarginsAPI);
}

export default function* gimpSagas() {
    yield all([
        fork(watchRequestMarginsAPI),
    ]);
}
