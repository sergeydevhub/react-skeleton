import {RootException} from "./root.exception";
import { ErrorsTranslation } from '@core/localization/locales';

export class ActionException extends RootException {
  constructor(
    public readonly type: string,
    message: keyof ErrorsTranslation = 'common'
  ) {
    super(`errors.${message}`);
  }
}
