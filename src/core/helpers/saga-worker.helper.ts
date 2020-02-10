import { StatefulActionCreators } from './redux-module.helper';
import { SagaIterator } from 'redux-saga';
import { call, put, cancelled } from 'redux-saga/effects';
import { ActionError } from "@core/errors/variations";
import { actions as notificationActions } from '@core/modules/ui/notifications';

type Worker = (props: any, ...args: Array<any>) => Promise<any> | SagaIterator

function sagaWorkerHelper(
  actionCreators: StatefulActionCreators
) {
  const helper = (worker: Worker) => {
    function * requestProcessing(
      data: any,
      ...args: Array<any>
    ): SagaIterator {
      const variant = 'error';
      try {
        const payload = yield (call as any)(worker, data, ...args);
        const successful = yield put(actionCreators.successful({ payload }));

        return { successful };
      } catch ({ message }) {
        const error = new ActionError(actionCreators.failure.type, message);
        yield put(notificationActions.showNotification({
          payload: {
            variant,
            message
          }
        }));
        const failure = yield put(actionCreators.failure({ data, error }));

        return { failure };
      } finally {
        if(yield cancelled()) {
          const error = new ActionError(actionCreators.failure.type);
          yield put(notificationActions.showNotification({
            payload: {
              variant,
              message: error.message
            }
          }));

          yield put((actionCreators.failure({ data, error })))
        }
      }
    }

    function setNaming<T extends Function>(fn: T, workerName: string): T {
      try {
        Object.defineProperty(fn, 'name', {
          value: workerName,
          configurable: true
        })
      } catch(e) {}

      return fn;
    }

    return setNaming(requestProcessing, worker.name)
  };

  return helper;
}

export {
  sagaWorkerHelper
};
