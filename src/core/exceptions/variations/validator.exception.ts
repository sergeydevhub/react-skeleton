import { RootException } from "./root.exception";
import { ValidatorTranslation } from '@core/localization/locales';

export class InvalidPropertyException<Verifications> extends RootException {
  constructor(
    message: keyof ValidatorTranslation,
    public readonly verification: Partial<Verifications>
  ) {
    super(message);
    this.message = `validator.${message}`;
  }
}

