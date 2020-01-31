import { produce } from 'immer';
import StoreModels from 'StoreModels';
import { DEFAULT_LANG, LOCALES } from "@core/configs/localization.config";
import { ReduxModuleHelper, defaultStatus } from '@core/helpers';
import * as ReduxTypes from "ReduxTypes";
import { ActionError } from "@core/errors/variations";
import { Reducer } from "redux";

class LocalizationModule extends ReduxModuleHelper {}
const localizationModule = new LocalizationModule('localization');

const getPredefinedLanguage = (): string => {
  const { languages } = navigator;
  if(languages && languages.length > 0) {
    return languages[0]
  }

  return DEFAULT_LANG;
};

const switchLanguage = (() => {
  const creator = localizationModule.async('switch');
  const { triggered } = creator.constructTriggered<string>();
  const { successful } = creator.constructSuccessful<string>();
  const { failure } = creator.constructFailure<ActionError>();

  return {
    triggered,
    successful,
    failure
  }
})();

const predefinedLang = getPredefinedLanguage();

export type RootAction = ReturnType<
  ReduxTypes.InferActions<typeof switchLanguage>
>

const initialState: StoreModels.Localization = {
  language: predefinedLang,
  locale: LOCALES[predefinedLang],
  status: defaultStatus
};

const reducer: Reducer = (
  state: StoreModels.Localization = initialState,
  action: RootAction
) => produce(state, draft => {
  const reducerHandlers = {
    [switchLanguage.successful.type]: () => {
      draft.language = action.payload;
    }
  };

  if(action.type in reducerHandlers) {
    draft.status = action.status;
    reducerHandlers[action.type]();
  }
});

const actions = {
  switchLanguage
};

export {
  actions,
  reducer,
  initialState,
  LocalizationModule,
  localizationModule
}

