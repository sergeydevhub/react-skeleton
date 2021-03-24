import { InvalidPropertyException as InvalidException } from "@core/exceptions/variations";

export type TNonEmptyArray<T> = [T, ...Array<T>];

export type TValidated<T> = Array<InvalidException<T>>

export type TEither<T> = InvalidException<T> | boolean;

type TIsTypeGuardValid<T> = (
  either: TEither<T>
) => either is InvalidException<T>;

type TAreTypeGuardsInvalid<T> = (
  validated: TValidated<T>
) => validated is TNonEmptyArray<InvalidException<T>>;

export const isStrictInvalid: TIsTypeGuardValid<any> = <T>(
  either: TEither<T>
): either is InvalidException<T> => either instanceof InvalidException;

