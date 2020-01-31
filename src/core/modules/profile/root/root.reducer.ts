import { reduceReducers } from "@core/utils";
import StoreModels from 'StoreModels';
import { reducer as account } from "../account";
import { initialState } from "./root.module";

export const rootReducer = reduceReducers<StoreModels.Profile>(initialState, account);
