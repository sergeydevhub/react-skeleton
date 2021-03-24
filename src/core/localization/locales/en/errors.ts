import * as Types from '../types';

const page: Types.PageErrorsTranslation = {
  notFound: 'Page not found',
  crash: 'Page accidentally crashed',
  error: 'Something goes wrong'
};

const transport: Types.TransportErrorsTranslation = {
  connectionError: 'Connection error',
  connectionRefused: 'Connection refused'
};

const auth: Types.AuthErrorsTranslation = {
  notLogged: 'User is not logged in',
  doesntExists: 'User does not exists',
  accessDenied: 'Access denied',
  sessionExpired: 'Session expired',
  authServiceNotFound: 'Auth service not found',
  jwtExpired: 'JWT expired',
};

const profile: Types.ProfileErrorsTranslation = {
  auth
};


export const errors: Types.ErrorsTranslation = {
  occur: 'Error occurred',
  common: 'Something goes wrong',
  page,
  profile,
  transport,
};
