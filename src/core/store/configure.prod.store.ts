import { compose, applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import setupSagaMiddleware, { SagaMiddlewareOptions } from 'redux-saga';
import { Middleware, StoreEnhancer, Store } from 'redux';
import rootReducer from './root.reducer';
import { History } from "history";
import rootSaga from './root.saga';
import * as Sentry from '@sentry/browser';
import { ErrorHandlingMiddleware } from '@core/middlewares';
import throttle from 'lodash/throttle';
import * as storageManager from "@core/store/browser.store";

function configureStore(history: History): Store {
  const initialState = storageManager.load();

  const onError: SagaMiddlewareOptions["onError"] = (
    error: Error, { sagaStack }
    ) => Sentry.captureException(error);

  const sagaOptions = {
    onError
  };

  const sagaMiddleware = setupSagaMiddleware(sagaOptions);
  const middlewares: Array<Middleware> = [
    sagaMiddleware,
    routerMiddleware(history),
    ErrorHandlingMiddleware
  ];

  const enhancers: Array<StoreEnhancer> = [
    applyMiddleware(...middlewares)
  ];

  const store: Store = createStore(
    rootReducer(history),
    initialState,
    compose(...enhancers)
  );

  sagaMiddleware.run(rootSaga);

  store.subscribe(
    throttle(() =>
      storageManager.save(
        store.getState()
      ), 1000)
  );

  return store
}

export default configureStore;
