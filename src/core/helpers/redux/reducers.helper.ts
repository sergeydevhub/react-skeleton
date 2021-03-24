import { Reducer } from 'redux';
import { RootAction, BaseAction } from '@core/helpers/redux/actions';

export const reducersHelper = <State>(
  initialState: State | undefined,
  ...reducers: Reducer<State, BaseAction | RootAction>[]
) : Reducer<State | undefined, BaseAction> => {
  return (prevState: State | undefined, action: BaseAction): State | undefined => {
    if(!prevState && !action && initialState) {
      return initialState;
    }

    const state = Boolean(prevState) && !action && initialState
      ? initialState
      : prevState;

    const result = reducers.reduce((newState: State | undefined, reducer: Reducer<State>) => {
      return reducer(newState, action)
    }, state);

    return result;
  };
};
