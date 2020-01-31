import { call, put, take } from 'redux-saga/effects';
import { Initializer } from "@core/transport";
import Cookie, { CookieAttributes } from 'js-cookie'
import { sagaWorkerHelper } from '@core/helpers';
import { actions, RootAction } from '../account.module';
import { SagaIterator } from 'redux-saga';
import { Events } from '@core/configs/transport.config'
import { history } from "@core/routing";
import { paths } from "@core/configs/router-paths.config";

function * verifyAuth() {
  const token = Cookie.get('token');
  if(!token) {
    return;
  }

  const expires = Cookie.get('expires_in');
  if(Number(expires) < Date.now()) {
    return;
  }

  const client = Initializer.getInstance();
  yield call(client.emit, Events.VERIFY_USER, token);
}

const loginWorker = sagaWorkerHelper(actions.login);

const login = loginWorker(function *(
  action: ReturnType<typeof actions.login.triggered>
): SagaIterator {
  const client = Initializer.getInstance();
  return yield call(client.emit, Events.LOGIN, action.payload)
});

function * loginHandler(successful: RootAction) {
  const options: CookieAttributes = {
    expires: 60,
    secure: true,
    sameSite: 'lax'
  };

  Cookie.set('token', successful.payload, options);
  history.location.pathname === paths.LOGIN
    ? history.push(paths.ROOT)
    : history.goForward()
}

const logoutWorker = sagaWorkerHelper(actions.logout);

const logout = logoutWorker(function *() {
  const client = Initializer.getInstance();
  return yield call(client.emit, Events.LOGOUT)
});

function * logoutHandler(successful: RootAction) {
  Cookie.remove('token');
  history.push(paths.ROOT)
}

export {
  verifyAuth,
  login,
  logout,
  loginHandler,
  logoutHandler
}
