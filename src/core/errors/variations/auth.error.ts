import { RootError } from "./root.error";
import { HttpStatusCodes } from "@core/configs/http-statuses.config";
import { AuthErrorsTranslation } from "@core/localization/locales";

class AuthError extends RootError {
  constructor(
    message: keyof AuthErrorsTranslation,
    public readonly code?: HttpStatusCodes
  ) {
    super(message, code);
    this.message = `errors.user.auth.${message}`;
  }
}


export { AuthError };
