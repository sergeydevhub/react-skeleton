import { RootError } from "./root.error";
import { AuthErrorsTranslation } from '@core/localization/locales';
import { HttpStatusCodes } from "@core/configs/http-statuses.config";

class UnauthorizedError extends RootError {
  constructor(message: keyof AuthErrorsTranslation) {
    super(message, HttpStatusCodes.UNAUTHORIZED);
    this.message = `errors.user.auth.${message}`;
  }
}

export {
  UnauthorizedError
}

