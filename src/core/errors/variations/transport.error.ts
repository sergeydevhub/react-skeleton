import { RootError } from "./root.error";
import { TransportErrorsTranslation } from '@core/localization/locales'
import { WSStatusCodes } from "@core/configs/ws-statuses.config";

export class TransportError extends RootError {
  constructor(
    statusCode: WSStatusCodes,
    message: keyof TransportErrorsTranslation = 'connectionError'
  ) {
    super(message);
    this.message = `errors.transport.${message}`;
  }
}
