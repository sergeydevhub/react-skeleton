import { combineReducers, Reducer } from "redux";
import { rootReducer as localization } from '@core/modules/localization/root'
import { rootReducer as users } from "@core/modules/users/root";
import { rootReducer as profile } from "@core/modules/profile/root";
import { History } from "history";
import { connectRouter } from "connected-react-router";

const root = (
  history: History
): Reducer => combineReducers({
  router: connectRouter(history),
  localization,
  users,
  profile
});

export default root;
