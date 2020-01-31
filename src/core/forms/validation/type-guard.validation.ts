import { InvalidPropertyError as InvalidException } from "@core/errors/variations";

export type NonEmptyArray<T> = [T, ...Array<T>];

export type Validated<T> = Array<InvalidException<T>>

export type Either<T> = InvalidException<T> | boolean;

type isTypeGuardValid<T> = (
  either: Either<T>
) => either is InvalidException<T>;

type AreTypeGuardsInvalid<T> = (
  validated: Validated<T>
) => validated is NonEmptyArray<InvalidException<T>>;

export const isStrictInvalid: isTypeGuardValid<any> = <T>(
  either: Either<T>
): either is InvalidException<T> => either instanceof InvalidException;

