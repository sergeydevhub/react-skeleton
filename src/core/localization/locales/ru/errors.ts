import * as Types from '../types';

const page: Types.PageErrorsTranslation = {
  notFound: 'Страница не найдена',
  crash: 'Страница завершила работу ошибкой'
};

const transport: Types.TransportErrorsTranslation = {
  connectionError: 'Ошибка подключения',
  connectionRefused: 'В соеденении отказано'
};

const auth: Types.AuthErrorsTranslation = {
  notLogged: 'Пользователь не вошли в систему',
  doesntExists: 'Такой пользователь не существует',
  accessDenied: 'В доступе отказано',
  sessionExpired: 'Срок действия сессии завершился',
  authServiceNotFound: 'Сервис аутентификации не обнаружен',
  jwtExpired: 'Срок действия JWT завершился'
};

const profile: Types.ProfileErrorsTranslation = {
  auth
};

export const errors: Types.ErrorsTranslation = {
  occur: 'Возникла ошибка',
  common: 'Что-то пошло не так',
  page,
  profile,
  transport,
};

export type ErrorsType = typeof errors;
