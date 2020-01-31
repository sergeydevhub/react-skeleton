import { Action } from '@core/helpers';

type Reducer<State> = (state: State | undefined, action: Action) => State;

export const reduceReducers = <State>(
  initialState: State | undefined,
  ...reducers: Reducer<State>[]
) : Reducer<State | undefined> => {
  return (prevState: State | undefined, action: Action): State | undefined => {
    if(!prevState && !action && initialState) {
      return initialState;
    }

    const reduceInitial = Boolean(prevState) && !action && initialState
      ? initialState
      : prevState;

    const result = reducers.reduce((newState: State | undefined, reducer: Reducer<State>) => {
      return reducer(newState, action)
    }, reduceInitial);

    return result;
  };
};
