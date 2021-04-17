import { en as defaultLang } from '@core/localization/locales';
import { HttpStatusCodes } from "@core/configs/http-statuses.config";
import { WSStatusCodes } from "@core/configs/ws-statuses.config";

const stackTraceHandling = (
  instance: Error,
  instanceConstructor: Function = instance.constructor
): void => {
  const captureStack: unknown = Error?.captureStackTrace;

  if(captureStack instanceof Function) {
    captureStack(instance, instanceConstructor);
  }
};

type IsExists = <M extends string, T>(message: M, obj: T) => boolean;

export class RootException extends Error {
  protected readonly _statusCode?: HttpStatusCodes | WSStatusCodes | undefined;

  constructor(
    message: string,
    statusCode?: HttpStatusCodes | WSStatusCodes | undefined,
    stack?: string
  ) {

    if(!message.length) {
      message = defaultLang.errors.common;
    }

    super(message);

    this.name = this.constructor.name;

    if(Boolean(statusCode)) {
      this._statusCode = statusCode;
    }

    this.stack = stack;

    Object.setPrototypeOf(this, RootException);
    stackTraceHandling(this)
  }

  get statusCode() {
    return this._statusCode;
  }
}

export type TRootError = typeof RootException
