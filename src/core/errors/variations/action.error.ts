import {RootError} from "./root.error";
import { ErrorsTranslation } from '@core/localization/locales';

export class ActionError extends RootError {
  constructor(
    public readonly actionType?: string,
    message: keyof ErrorsTranslation = 'common'
  ) {
    super(message);
    this.message = `errors.${message}`;
  }
}
