import { sagaWorkerService } from '@core/services';
import { actions } from '../profile.module';
import { HttpClient } from '@core/transport';
import { login, LoginDTO, logout, LogoutDTO } from '../api';
import { TMeta } from "@core/transport";
import Cookie, { CookieAttributes } from 'js-cookie'
import { history } from "@core/routing";
import { paths } from "@core/routing/routes";
import { config } from '@core/configs/cookies.config';

const loginWorker = sagaWorkerService(actions.login);

export const loginService = loginWorker(async (
  client: HttpClient,
  action: ReturnType<typeof actions.login.triggered>
) => {
  const url = login(action);
  const params = action.meta;
  //TODO secure password & extend auth flow
  return client.post<LoginDTO, TMeta>(url, action.payload, { params });
});

export const loginProcessing = (
  action: ReturnType<typeof actions.login.successful>,
  meta: TMeta
): void => {
  meta?.helpers?.setSubmitting(false);
  const options: CookieAttributes = { ...config };

  Cookie.set('accessToken', action.payload.accessToken, options);

  history.location.pathname === paths.LOGIN
    ? history.push(paths.HOME)
    : history.goForward()
};

const logoutWorker = sagaWorkerService(actions.logout);

export const logoutService = logoutWorker(async (
  client: HttpClient,
  action: ReturnType<typeof actions.logout.triggered>
) => {
  const url = logout(action);
  const params = action.meta;
  return client.post<LogoutDTO, TMeta>(url, action.payload, { params });
});

export const logoutProcessing = (
  action: ReturnType<typeof actions.logout.successful>
): void => {
  Cookie.remove('accessToken');

  if(history.location.pathname !== paths.ROOT) {
    history.push(paths.ROOT);
  }
};
