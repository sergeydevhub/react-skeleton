import { InstanceConverter } from "@core/converters";
import { RootException } from "@core/exceptions/variations";
import { ClassConstructor } from 'Utils';
import {
  ValidationError,
  validateSync,
  isObject,
  ValidatorOptions
} from 'class-validator';
import { IValidator } from "./types";

export class InstanceValidator<T extends object> implements IValidator<T> {
  constructor(
    private readonly _Origin: ClassConstructor<T>
  ) {}

  public static isObject(data: unknown): boolean {
    return isObject(data);
  }

  public isInherited(child: object): child is T {
    return child instanceof this._Origin
      || child.constructor.name === this._Origin.name;
  }

  public validate<E extends ValidationError>(
    data: object,
    options: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true
    }): Array<ValidationError | TypeError> {
    if(!(this.isInherited(data))) {
      const converter = new InstanceConverter<object, T>();
      data = converter.to(data, this._Origin);
    }

    const errors = validateSync(data);

    if(errors.length) {
      return errors as Array<ValidationError>
    }

    return errors;
  }

  public isValid(data: unknown): boolean {
    if(!InstanceValidator.isObject(data)) {
      return false
    }

    const errors = this.validate((data as T));

    return Boolean(errors.length);
  }
}
