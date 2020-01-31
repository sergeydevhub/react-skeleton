import Models from "StoreModels";
import { initialState, reducer } from "./root.module";
import { reduceReducers } from "@core/utils";

export const rootReducer = reduceReducers<Models.Users>(initialState, reducer);
