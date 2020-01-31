export interface AuthErrorsTranslation {
  notLogged: string,
  doesntExists: string,
  accessDenied: string,
  sessionExpired: string,
  authServiceNotFound: string,
  jwtExpired: string
}

export interface ProfileErrorsTranslation {
  auth: AuthErrorsTranslation
}

export interface TransportErrorsTranslation {
  connectionError: string,
  connectionRefused: string
}

export interface PageErrorsTranslation {
  notFound: string,
  crash: string
}

export interface ErrorsTranslation {
  occur: string,
  common: string,
  profile: ProfileErrorsTranslation,
  page: PageErrorsTranslation,
  transport: TransportErrorsTranslation
}

export interface TitleTranslation {
  mask: string,
  login: string,
  main: string,
  registration: string,
  accountRestore: string
}

export interface PageTranslation {
  leavePage: string,
  titles: TitleTranslation
}

export interface TransportTranslation {
  connectionEstablished: string,
  reconnecting: string,
}

export interface ValidatorTranslation {
  greaterThan: string,
  lessThan: string,
  equal: string,
  invalid: string,
  letters: string,
  digits: string,
  required: string
}

export interface UITranslation {
  send: string,
  edit: string,
  settings: string,
  profile: string,
  formIncomplete: string
}

export interface ProfileTranslation {
  login: string,
  logout: string,
  email: string,
  password: string
}
