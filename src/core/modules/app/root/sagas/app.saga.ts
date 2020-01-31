import { take, call } from 'redux-saga/effects';
import { actions as appActions } from '../root.module';
import { channel } from '@core/transport'

function * init() {
  while(true) {
    yield take(appActions.init.type);
    yield call(channel)
  }
}

export {
  init
}
