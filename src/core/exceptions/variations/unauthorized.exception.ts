import { RootException } from "./root.exception";
import { AuthErrorsTranslation } from '@core/localization/locales';
import { HttpStatusCodes } from "@core/configs/http-statuses.config";

class UnauthorizedException extends RootException {
  constructor(message: keyof AuthErrorsTranslation) {
    super(message, HttpStatusCodes.UNAUTHORIZED);
    this.message = `errors.user.auth.${message}`;
  }
}

export {
  UnauthorizedException
}

