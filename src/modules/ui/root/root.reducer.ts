import { combineReducers } from "redux";
import { rootReducer as notifications } from '../notifications';
import { rootReducer as theme } from '../theme';

export const rootReducer = combineReducers({
  notifications,
  theme
});
