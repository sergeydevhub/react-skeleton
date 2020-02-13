import { en as defaultLang } from '@core/localization/locales';
import { HttpStatusCodes } from "@core/configs/http-statuses.config";
import { WSStatusCodes } from "@core/configs/ws-statuses.config";

const stackTraceHandling = (
  instance: Error, instanceConstructor: Function = instance.constructor
) => {
  const captureStack: Function = (Error as any).captureStackTrace;

  if(captureStack) {
    captureStack(instance, instanceConstructor);
  }
};

type IsExists = <M extends string, T>(message: M, obj: T) => boolean;

const checkExists: IsExists = (message, obj) => {
  return message in obj
};

export class RootError extends Error {
  protected readonly _statusCode?: HttpStatusCodes | WSStatusCodes | undefined;

  constructor(message: string, statusCode?: HttpStatusCodes | WSStatusCodes | undefined) {
    if(!message) {
      message = defaultLang.errors.common;
    }

    super(message);
    this._statusCode = statusCode;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, RootError);

    stackTraceHandling(this)
  }

  get statusCode(): any {
    return this._statusCode;
  }
}

export type TRootError = typeof RootError
