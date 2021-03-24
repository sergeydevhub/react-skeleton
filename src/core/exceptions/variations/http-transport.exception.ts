import { RootException } from './root.exception';
import { HttpStatusCodes } from "@core/configs/http-statuses.config";

export class HTTPResponseException extends RootException {
  constructor(
    message: string,
    statusCode: HttpStatusCodes
  ) {
    super(message, statusCode);
  }
}
