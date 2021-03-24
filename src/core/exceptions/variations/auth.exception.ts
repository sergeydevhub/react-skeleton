import { RootException } from "./root.exception";
import { HttpStatusCodes } from "@core/configs/http-statuses.config";
import { AuthErrorsTranslation } from "@core/localization/locales";

class AuthException extends RootException {
  constructor(
    message: keyof AuthErrorsTranslation,
    public readonly code?: HttpStatusCodes
  ) {
    super(message, code);
    this.message = `errors.user.auth.${message}`;
  }
}


export { AuthException };
