import { reduceReducers } from "@core/utils";
import StoreModels from 'StoreModels';
import { reducer, initialState } from './root.module';

export const rootReducer = reduceReducers<StoreModels.Localization>(initialState, reducer);
