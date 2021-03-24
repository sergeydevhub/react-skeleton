import {ActionCreator, Reducer} from 'redux';
import { ReduxModuleHelper } from "@core/helpers/redux";
import { ObjectRepository } from "@core/helpers/redux/state";
import {BaseAction} from "@core/helpers/redux/actions";
import { TTheme, TThemeStatusConditions } from "./data";

export type State = TTheme;

const status: TThemeStatusConditions = {
  isActive: false
};

const initialState: State = {
  dark: { status },
  light: { status }
};

const themeModule = new ReduxModuleHelper<State>('theme', ObjectRepository);

const switchTheme = themeModule.sync<keyof TTheme>(['switch']);

export const rootReducer: Reducer<State, BaseAction> = themeModule.reducer(
  (repository: ObjectRepository<State>) => ({
  [switchTheme.type]: (
    state: State = initialState, action: ReturnType<typeof switchTheme>
  ) => repository.update({ status: { isActive: true }}, action.payload)
}), initialState);

export const actions = {
  switchTheme
};
