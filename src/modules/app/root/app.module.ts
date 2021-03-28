import { ReduxModuleHelper } from '@core/helpers/redux';
import { ObjectRepository } from "@core/helpers/redux/state";
import { RootAction } from "@core/helpers/redux/actions";
import * as ReduxTypes from 'ReduxTypes';

export type TState = Record<ReduxTypes.StatePartitions, any> | object;

const appModule = new ReduxModuleHelper<TState>('app', ObjectRepository);

const init = appModule.sync(['init']);
const resetToDefault = appModule.sync(['reset', 'default']);

export const initialState: Partial<TState> = {};

export const reducer = appModule.reducer(
(repository: ObjectRepository<TState>) => ({
  [resetToDefault.type]: (state: TState = initialState, action: RootAction) => initialState
}), initialState);

export const actions = {
  resetToDefault,
  init
};
