import { RootException } from "./root.exception";
import { TransportErrorsTranslation } from '@core/localization/locales'
import { WSStatusCodes } from "@core/configs/ws-statuses.config";

export class WsTransportException extends RootException {
  constructor(
    statusCode: WSStatusCodes,
    message: keyof TransportErrorsTranslation = 'connectionError'
  ) {
    super(message);
    this.message = `errors.transport.${message}`;
  }
}
