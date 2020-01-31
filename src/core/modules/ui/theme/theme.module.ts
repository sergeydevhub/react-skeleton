import { Reducer } from 'redux';
import { ReduxModuleHelper } from "@core/helpers";
import ReduxTypes from 'ReduxTypes';
import {Draft, produce} from "immer";
import { Theme, Status } from './models';

class ThemeModule extends ReduxModuleHelper {}
const themeModule = new ThemeModule('theme');

const switchTheme = themeModule.sync<keyof Theme>('switch');

const actions = {
  switchTheme
};

type RootAction = ReturnType<
  ReduxTypes.InferActions<typeof actions>
>

const statusConditions: Status= {
  status: {
    isActive: false
  }
};
const initialState: Theme = {
  dark: statusConditions,
  light: statusConditions
};

const reducer: Reducer = (
  state: Theme = initialState,
  action: RootAction
) => produce(state, (draft: Draft<Theme>) => {
  const handlers = {
    [switchTheme.type]: () => {
      const keys = Object.keys(draft) as Array<keyof Theme>;
      keys.map(key => {
        draft[key].status.isActive = false;
      });
      const theme: keyof Theme = action.payload;
      draft[theme].status.isActive = true;
    }
  };

  if(action.type in handlers) {
    handlers[action.type]()
  }
});

export {
  actions,
  themeModule,
  ThemeModule,
  initialState,
  reducer
}
