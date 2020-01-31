import * as Sentry from "@sentry/browser";
import { FailureAction, Action, defaultStatus as status } from '@core/helpers';
import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import { RootError } from "@core/errors/variations";

const handleError = (
  action: FailureAction<RootError>
): void => {
  Sentry.captureException(action.error);
  Sentry.addBreadcrumb({
    category: 'redux',
    message: action.error.message,
    level: Sentry.Severity.Error,
    data: action.payload
  })
};

const middleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch<Action>) => (action: Action) => {
  if(action.error) {
    handleError(action as FailureAction<RootError>)
  }

  try {
    return next(action)
  } catch (error) {
    status.isFailure = !status.isFailure;
    const failedAction: FailureAction<RootError> = { ...action, error, status };
    handleError(failedAction)
  }
};

export default middleware;
