import {ValidatorOptions} from "class-validator";
import {RootException} from "@core/exceptions/variations";

export interface IValidator<T extends object> {
  isInherited(child: any): boolean;
  validate(data: object, options?: ValidatorOptions | object): Array<object | TypeError>
  isValid<Data>(data: Data extends T ? Data : unknown): boolean;
}
