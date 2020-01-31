import { RootError } from "@core/errors/variations/root.error";
import { ErrorsTranslation } from '@core/localization/locales';

export class CommonError extends RootError {
  constructor(
    message: keyof ErrorsTranslation = 'common'
  ) {
    super(message);
    this.message = `errors.${message}`;
  }
}
