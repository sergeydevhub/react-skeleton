import { combineReducers, Reducer, CombinedState } from "redux";
import { connectRouter } from "connected-react-router";
import { BaseAction } from "@core/helpers/redux/actions";
import { reducer } from "./app.module";
import { history } from '@core/routing';
import { rootReducer as ui } from '@modules/ui/root';
import { rootReducer as profile } from '@modules/profile/root';
import { rootReducer as localization } from '@modules/localization/root';

const combinedReducers = combineReducers({
  router: connectRouter(history),
  localization,
  profile,
  ui
});

export const rootReducer: Reducer<RootState, BaseAction> = (
  state: RootState | undefined, action: BaseAction
) => combinedReducers(
  reducer(state, action) as any,
  action
);

export type RootState = ReturnType<typeof combinedReducers>;
