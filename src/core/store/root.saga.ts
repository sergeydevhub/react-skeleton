import { fork } from 'redux-saga/effects';
import { rootSaga as app } from '@core/modules/app/root';
import { rootSaga as profile } from '@core/modules/profile/root';

function * root() {
  yield fork(app);
  yield fork(profile);
}

export default root;
