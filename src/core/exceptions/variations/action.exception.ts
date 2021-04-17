import {RootException} from "./root.exception";
import {ErrorsTranslation, ValidatorTranslation} from '@core/localization/locales';

type TAvailableMessages = keyof ErrorsTranslation | keyof ValidatorTranslation;

export class ActionException extends RootException {
  public readonly payload: any;

  constructor(
    public readonly type: string,
    message: TAvailableMessages = 'common',
    payload?: any
  ) {
    super(`errors.${message}`);
    this.payload = payload;
  }
}
