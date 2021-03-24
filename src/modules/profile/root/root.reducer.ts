import { Reducer } from 'redux';
import { reducersHelper } from "@core/helpers/redux";
import { initialState, reducer } from './profile.module';

// export const rootReducer = reducersHelper(initialState, (reducer as Reducer));

export const rootReducer = reducer;
