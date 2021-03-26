import { HttpStatusCodes } from "@core/configs/http-statuses.config";
import { TConditionalActionCreators } from "@core/helpers/redux";
import { SagaIterator } from 'redux-saga';
import { call, put, cancelled, CallEffect, cancel } from 'redux-saga/effects';
import { ActionException } from "@core/exceptions/variations";
import { actions as notificationActions } from '@modules/ui/notifications';
import * as Sentry from '@sentry/browser';
import {AbstractHttpTransport, HttpClient} from "@core/transport";
import { HTTPResponseException, CommonException, RootException } from '@core/exceptions/variations';
import { TriggeredAction } from "@core/helpers/redux/actions";
import { paths } from '@core/routing/routes';
import { history } from '@core/routing';

type TWorkerRuntimeEnv<T> = (worker: TWorker<T>) => (...args: any[]) => any

type TWorker<T> = (
  httpClient: HttpClient,
  action: TriggeredAction<T>,
) => Promise<unknown> | SagaIterator

export function sagaWorkerService<T, E extends RootException, S>(
  actionCreators: TConditionalActionCreators<T, E, S>
): TWorkerRuntimeEnv<T> {
  return (worker: TWorker<T>) => {
    function * requestProcessing(
      action: TriggeredAction<T>,
      ...args: Array<any>
    ): SagaIterator {
      try {
        const httpClient: AbstractHttpTransport = HttpClient.getInstance();
        const result = yield (call as any)(worker, httpClient, action, ...args);
        yield put(actionCreators.successful(result));

      } catch (e) {
        const error: RootException = e instanceof Error
        ? new CommonException('occur')
        : new HTTPResponseException(e.message, e.status);

        yield put(actionCreators.failure(error));
        yield put(notificationActions.show({ variant: 'error', message: error.message }));
        Sentry.captureException(error);

        const responseHandlers: Partial<{[key in HttpStatusCodes]: Function}> = {
          [HttpStatusCodes.UNAUTHORIZED]: (): void => {
            history.location.pathname !== paths.LOGIN
            ? history.push(paths.LOGIN)
            : history.goForward()
          },
          [HttpStatusCodes.SERVICE_UNAVAILABLE]: (): void => {
            history.push(paths.ERROR)
          },
          [HttpStatusCodes.NOT_FOUND]: (): void => {
            history.push(paths.NOT_FOUND)
          },
          [HttpStatusCodes.INTERNAL_SERVER_ERROR]: (): void => {
            history.push(paths.ERROR)
          },
        };

        const statusCode: HttpStatusCodes = e.status;

        if(statusCode in responseHandlers) {
         (responseHandlers[statusCode] as any)()
        }

        yield cancel();
      } finally {
        if(yield cancelled()) {
          HttpClient.unset();

          const error = new ActionException(actionCreators.failure.type);
          yield put(actionCreators.failure(error));
          yield put(notificationActions.show({ variant: 'error', message: error.message }));

          history.push(paths.ERROR)
        }
      }
    }

    return requestProcessing;
  };
}
