import { take, call, fork, race } from 'redux-saga/effects';
import { actions } from '../account.module';
import * as workers from './auth-worker.saga';
import Cookie from "js-cookie";


function * loginWatcher() {
  try {
    while(true) {
      const { login, logout } = yield race({
        login: take(actions.login.triggered.type),
        logout: take(actions.logout.triggered.type),
      });

      if(login) {
        yield fork(workers.login, login);
        const { successful, failure } = yield race({
          successful: take(actions.login.successful.type),
          failure: take(actions.login.failure.type),
        });

        if(successful) {
          yield fork(workers.loginHandler, successful);
        }
      }

      if(logout) {
        const token = Cookie.get('token');
        yield fork(workers.logout, token);
        const { successful, failure } = yield race({
          successful: take(actions.logout.successful.type),
          failure: take(actions.logout.failure.type),
        });

        if(successful) {
          yield fork(workers.logoutHandler, successful);
        }
      }
    }
  } catch (e) {
  }
}

export {
  loginWatcher
}

