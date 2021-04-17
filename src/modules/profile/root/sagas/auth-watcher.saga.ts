import { take, put, fork, all, call } from 'redux-saga/effects';
import { actions } from '../profile.module';
import {
  loginService,
  loginProcessing,
  logoutService,
  logoutProcessing
} from "./auth-worker.saga";

export function * loginWatcher() {
  try {
    while(true) {
      const login = yield take(actions.login.triggered.type);
      yield fork(loginService, login);

      const { successful, failure } = yield all({
        successful: take(actions.login.successful.type),
        failure: take(actions.login.failure.type)
      });

      if(successful) {
        yield fork(loginProcessing, successful, login.meta);
      }
    }
  } catch {}
}

export function * logoutWatcher() {
  try {
    while(true) {
      const action = yield take(actions.login.triggered.type);
      yield fork(logoutService, action);

      const { successful, failure } = yield all({
        successful: take(actions.login.successful.type),
        failure: take(actions.login.failure.type)
      });

      if(successful) {
        yield fork(logoutProcessing, successful);
      }
    }
  } catch {}
}
