import * as Sentry from "@sentry/browser";
import { FailureAction, RootAction as Action, isFailureTypeGuard } from '@core/helpers/redux/actions';
import {Dispatch, Middleware, MiddlewareAPI} from 'redux';

const handleError = (
  action: FailureAction
): void => {
  Sentry.captureException(action.payload);
  Sentry.addBreadcrumb({
    category: 'redux',
    message: action.message,
    level: Sentry.Severity.Error,
    data: action.payload
  })
};

const middleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch<Action>) => (action: Action) => {
  if(isFailureTypeGuard(action)) {
    handleError(action)
  }

  try {
    return next(action)
  } catch (error) {
    const failedAction = new FailureAction(error.message);
    handleError(failedAction)
  }
};

export default middleware;
