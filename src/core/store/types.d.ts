import { Action } from '@core/helpers'
import { Reducer } from 'redux';
import { InferActions } from "@core/helpers/redux";

export type LocalStorageAllowedKeys = 'STORE' | 'accessToken' | 'expireAt';

type TStateType<
  TReducerOrMap extends any
  > = TReducerOrMap extends Reducer<any, any>
  ? ReturnType<TReducerOrMap>
  : TReducerOrMap extends Record<any, any>
    ? { [K in keyof TReducerOrMap]: TStateType<TReducerOrMap[K]> }
    : never;

declare module 'ReduxTypes' {
    // @ts-check
    /** @type {import('./root.reducer')} */
  export type RootState = ReturnType<typeof import('@modules/app/root').rootReducer>

  export type RootAction<Actions extends Record<string, Action>> = ReturnType<InferActions<Actions>>

  export type StatePartitions = 'app' | 'ui' | 'users' | 'profile' | 'router' | 'notifications' | 'theme' | 'localization';

  export type State<T extends object = object> = T | Array<T> | Record<keyof T, T> | Array<any> | Record<string | number, any>;
}
