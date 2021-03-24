import { AbstractConverter } from "./types";
import {camelToSnakeCase, snakeToCamelCase} from "@core/utils";

export class KeyConverter<Input extends Record<string, any>, Output extends Record<string, any>>
  extends AbstractConverter<Input, Output> {
  protected static transform<I, O, F extends (str: string) => string>(input: I, output: O, option: F): O {
    const result: Record<string, any> = {};

    const iterable = Object.entries(input);
    for(let [ key, value ] of iterable) {
      result[option(key)] = value;
    }

    return result as O;
  }

  public to(from: Input, to?: Output): Output {
    return KeyConverter.transform(from, to, camelToSnakeCase) as Output;
  }

  public from(from: Input, to?: Output): Output {
    return KeyConverter.transform(from, to, snakeToCamelCase) as Output;
  }
}
