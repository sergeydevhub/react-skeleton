import { fork, all } from 'redux-saga/effects';
import { sagas as accountSaga} from '../account';

export function * rootSaga() {
  yield all(Object.values(accountSaga).map(saga => fork(saga)));
}
