import { compose, applyMiddleware, createStore, Reducer } from 'redux';
import { history } from '@core/routing';
import { routerMiddleware } from 'connected-react-router';
import setupSagaMiddleware, { SagaMiddlewareOptions } from 'redux-saga';
import { Saga } from '@redux-saga/types';
import * as Sentry from '@sentry/browser';
import { Middleware, StoreEnhancer, Store } from 'redux'
import { ErrorProcessingMiddleware } from '@core/middlewares';
import * as browserStorage from "./browser.storage";
import throttle from 'lodash/throttle';

function configureStore(rootReducer: Reducer, rootSaga: Saga): Store {
  const savedData = browserStorage.load(browserStorage.STORAGE_KEY) ;
  const initialState = !savedData ? {} : savedData;

  const onError: SagaMiddlewareOptions["onError"] = (
    error: Error, { sagaStack }
    ) => Sentry.captureException(error);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaOptions = {
    onError
  };

  const sagaMiddleware = setupSagaMiddleware(sagaOptions);
  const middleware: Array<Middleware> = [
    sagaMiddleware,
    routerMiddleware(history),
    ErrorProcessingMiddleware
  ];

  const enhancers: StoreEnhancer = applyMiddleware(...middleware);

  if (module.hot) {
    module.hot.accept();
  }

  const store: Store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(enhancers)
  );

  sagaMiddleware.run(rootSaga);

  store.subscribe(
    throttle(() =>
      browserStorage.save(
        browserStorage.STORAGE_KEY,
        store.getState()
      ), 1500)
  );

  return store
}

export default configureStore;
