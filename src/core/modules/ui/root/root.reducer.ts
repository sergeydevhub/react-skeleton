import StoreModels from 'StoreModels';
import { reducer as theme } from '../theme';
import { reducer as notifications } from '../notifications';
import { combineReducers } from "redux";

export const rootReducer = combineReducers<StoreModels.UI>({
  notifications,
  theme
});
