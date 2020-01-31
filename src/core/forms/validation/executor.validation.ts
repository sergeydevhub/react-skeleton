import { InvalidPropertyError as InvalidException } from "@core/errors/variations/validator.error";
import {isStrictInvalid, Either, Validated } from "./type-guard.validation";

export type Validate<T> = (rule: T) => Either<T>;

type ValidateAll = <T>(rules: Array<Validate<T>>, entry: T) => Validated<T>;

export const execute: ValidateAll = <T>(
  rules: Array<Validate<T>>, entry: T
): Validated<T> => {
  const validateRules: Array<Either<T>> = rules.map(
    (rule: Validate<T>): Either<T> => {
      let result;

      try {
        result = Boolean(
          rule(entry)
        );
      } catch(exception) {
        result = exception
      }

      return result;
    }
  );

  const accumulateErrors = (
    accumulator: Array<InvalidException<T>>,
    current: Either<T>
  ): Array<InvalidException<T>> => {
    if(isStrictInvalid(current)) {
      accumulator.push(current);
    }

    return accumulator;
  };

  const exceptions: Array<InvalidException<T>> = validateRules.reduce(accumulateErrors, []);

  return exceptions;
};
