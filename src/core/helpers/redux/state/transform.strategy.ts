import { ExtractValue } from "Utils";
import { ClassConverter } from "@core/converters";
import { Reducer } from "redux";

export interface IStrategy<State> {
  transform(payload: any, key?: keyof State | string | number | unknown): State;
}

//TODO split into separate files
export class CollectionStrategy<
  State extends Record<string, ReturnType<Reducer>>
> implements IStrategy<State> {
  public transform<P extends ExtractValue<State>>(payload: P, key: keyof ExtractValue<State> = payload.id): State {
    const converter = new ClassConverter<ExtractValue<State>, ExtractValue<State>>();
    const converted = converter.fromClass(payload);
    const node = { [key]: converted } as State;
    return node;
  }
}

export class DefaultStrategy<State extends object> implements IStrategy<State> {
  public transform(payload: State): State {
    const converter = new ClassConverter<State, State>();
    return converter.fromClass(payload);
  }
}

export class ArrayStrategy<State extends Array<any>> extends DefaultStrategy<State> {}
