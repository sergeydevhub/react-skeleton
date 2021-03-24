import { fork } from 'redux-saga/effects';
import { rootSaga as profile } from "@modules/profile/root";

export function * rootSaga() {
  yield fork(profile);
}
