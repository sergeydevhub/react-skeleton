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
    protected readonly origin: ClassConstructor<T>
  ) {}

  public static isObject(data: unknown): boolean {
    return isObject(data);
  }

  public isTypeOf<Parent>(child: object): child is T {
    return child instanceof this.origin
      || child.constructor.name === this.origin.name;
  }

  public validate<E extends ValidationError>(
    data: object,
    options: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true
    }): Array<ValidationError | TypeError> {
    const converter = new ClassConverter<T, Object>();
    const instance = converter.toClass(data, this.origin);
    const errors = validateSync(instance);

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
