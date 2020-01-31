import { all, fork } from 'redux-saga/effects';
import * as sagas from './sagas';

export function * rootSaga() {
  yield all(Object.values(sagas).map(saga => fork(saga)));
}
