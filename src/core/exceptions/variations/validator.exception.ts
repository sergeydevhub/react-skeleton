import { RootException } from "./root.exception";
import { ValidatorTranslation } from '@core/localization/locales';

export class InvalidPropertyException<Property> extends RootException {
  constructor(
    message: keyof ValidatorTranslation,
    public property: Partial<keyof Property>
  ) {
    super(message);
    this.message = `validator.${message}`;
  }
}

