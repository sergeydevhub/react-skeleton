import {
  classToPlain,
  plainToClass,
  ClassTransformOptions,
} from "class-transformer";
import { ClassConstructor } from "Utils";
import { AbstractConverter } from "./types";

export class ClassConverter<Input, Output> extends AbstractConverter<Input, Output> {
  constructor() {
    super();
  }

  public toClass<O extends ClassConstructor<Output>>(from: object, to: O): Output {
    return this.to((from as any), to);
  }

  public fromClass(from: Input): Output {
    return this.from(from);
  }

  protected to(
    from: Input,
    to: ClassConstructor<Output>,
    options?: ClassTransformOptions
  ): Output {
    return plainToClass(to, from)
  }

  protected from(
    input: Input,
    options?: ClassTransformOptions
  ): Output {
    return classToPlain<Input>(input) as Output;
  }
}
