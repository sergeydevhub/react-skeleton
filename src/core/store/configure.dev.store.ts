import { compose, applyMiddleware, createStore } from 'redux';
import { History } from "history";
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './root.reducer';
import rootSaga from './root.saga';
import setupSagaMiddleware, { SagaMiddlewareOptions } from 'redux-saga';
import * as Sentry from '@sentry/browser';
import { Middleware, StoreEnhancer, Store } from 'redux'
import { ErrorHandlingMiddleware } from '@core/middlewares';
import * as storageManager from "./browser.store";
import throttle from 'lodash/throttle';

function configureStore(history: History): Store {
  const initialState = storageManager.load();

  const onError: SagaMiddlewareOptions["onError"] = (
    error: Error, { sagaStack }
    ) => Sentry.captureException(error);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaOptions = {
    onError
  };

  const sagaMiddleware = setupSagaMiddleware(sagaOptions);
  const middlewares: Array<Middleware> = [
    sagaMiddleware,
    routerMiddleware(history),
    ErrorHandlingMiddleware
  ];

  const enhancers: StoreEnhancer = applyMiddleware(...middlewares);

  if (module.hot) {
    module.hot.accept();
  }

  const store: Store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(enhancers)
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
