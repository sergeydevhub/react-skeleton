import { RootError } from "./root.error";
import { ValidatorTranslation } from '@core/localization/locales';

export class InvalidPropertyError<Property> extends RootError {
  constructor(
    message: keyof ValidatorTranslation,
    public property: Partial<keyof Property>
  ) {
    super(message);
    this.message = `validator.${message}`;
  }
}

