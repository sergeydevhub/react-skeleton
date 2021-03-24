import { RootException } from "./root.exception";
import { ErrorsTranslation } from '@core/localization/locales';

export class CommonException extends RootException {
  constructor(
    message: keyof ErrorsTranslation = 'common'
  ) {
    super(message);
    this.message = `errors.${message}`;
  }
}
