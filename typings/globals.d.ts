import { compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__?: any
  }
}
