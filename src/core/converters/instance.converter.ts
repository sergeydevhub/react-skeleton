import {
  classToPlain,
  plainToClass,
  ClassTransformOptions,
} from "class-transformer";
import { ClassConstructor } from "Utils";
import { AbstractConverter } from "./types";

type Instance = object;

export class InstanceConverter<Input extends Instance, Output extends Instance>
  extends AbstractConverter<Input, Output> {
  constructor() {
    super();
  }

  public to(
    from: Instance,
    to: ClassConstructor<Output>,
    options?: ClassTransformOptions
  ): Output {
    return plainToClass(to, from)
  }

  public from(
    input: Instance,
    options?: ClassTransformOptions
  ): Output {
    return classToPlain(input) as Output;
  }
}
