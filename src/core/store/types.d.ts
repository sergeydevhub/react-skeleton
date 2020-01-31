import { Reducer } from 'redux';
import { Action } from '@core/helpers'

type StateType<
  ReducerOrMap extends any
  > = ReducerOrMap extends Reducer<any, any>
  ? ReturnType<ReducerOrMap>
  : ReducerOrMap extends Record<any, any>
    ? { [K in keyof ReducerOrMap]: StateType<ReducerOrMap[K]> }
    : never;

declare module 'ReduxTypes' {
  export type RootState = StateType<
    ReturnType<typeof import('./root.reducer').default>
  >;

  export type InferActions<T> = T extends { [key: string]: infer U } ? U : never;

  export type RootAction = ReturnType<
    InferActions<Record<string, Action>>
  >

  export interface DTO<U, T> {
    serialize?(obj: U): Partial<T>;
    deserialize?(obj: T): Partial<U>;
  }
}
