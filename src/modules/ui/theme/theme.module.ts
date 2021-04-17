import {ActionCreator, Reducer} from 'redux';
import { ReduxModuleHelper } from "@core/helpers/redux";
import { ObjectRepositoryHelper } from "@core/helpers/redux/state";
import {BaseAction} from "@core/helpers/redux/actions";
import { TTheme, TThemeStatusConditions } from "./data";

export type TState = TTheme;

const status: TThemeStatusConditions = {
  isActive: false
};

const initialState: TState = {
  dark: { status },
  light: { status }
};

const themeModule = new ReduxModuleHelper<TState>('theme', ObjectRepositoryHelper);

const switchTheme = themeModule.sync<keyof TTheme>(['switch']);

export const rootReducer: Reducer<TState, BaseAction> = themeModule.reducer(
  (repository: ObjectRepositoryHelper<TState>) => ({
  [switchTheme.type]: (
    state: TState = initialState, action: ReturnType<typeof switchTheme>
  ) => repository.update({ status: { isActive: true }}, action.payload)
}), initialState);

export const actions = {
  switchTheme
};
