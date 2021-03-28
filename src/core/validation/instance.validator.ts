import { ClassConverter } from "@core/converters";
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
    protected readonly Origin: ClassConstructor<T>
  ) {}

  public static isObject(data: unknown): boolean {
    return isObject(data);
  }

  public isTypeOf(child: object): child is T {
    return child instanceof this.Origin
      || child.constructor.name === this.Origin.name;
  }

  public validate<E extends ValidationError>(
    data: object,
    options: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true
    }): Array<ValidationError | TypeError> {
    if(!(data instanceof this.Origin)) {
      const converter = new ClassConverter<T, Object>();
      data = converter.toClass(data, this.Origin);
    }

    const errors = validateSync(data);

    if(errors.length) {
      return errors as Array<ValidationError>
    }

    if(!this.isTypeOf(data)) {
      return [
        new TypeError(`${ data.constructor.name } has incorrect type.`)
      ];
    }

    return errors;
  }

  public isValid<Data>(data: Data extends T ? Data : unknown): boolean {
    if(!InstanceValidator.isObject(data)) {
      return false
    }

    const errors = this.validate((data as T));

    return Boolean(errors.length);
  }
}
