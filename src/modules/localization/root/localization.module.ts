import { Reducer }  from "redux";
import { ObjectRepository } from "@core/helpers/redux/state";
import { ReduxModuleHelper } from "@core/helpers/redux";
import { getPredefinedLanguage } from "@core/utils";
import { LocalizationEntity } from "./data";
import { TAvailableLangs, LOCALES } from "@core/configs/localization.config";

export type TState = LocalizationEntity;

const lang = getPredefinedLanguage();
export const initialState: TState = new LocalizationEntity({ locale: LOCALES[lang], language: lang });

const localizationModule = new ReduxModuleHelper<TState>('localization', ObjectRepository);

const switchLang = localizationModule.sync<TAvailableLangs>(['switch']);

export const reducer = localizationModule.reducer(
  (repository: ObjectRepository<TState>) => ({
  [switchLang.type]: (
    state: TState = {...initialState},
    action: ReturnType<typeof switchLang>
  ) => repository.update({ language: action.payload, locale: LOCALES[action.payload] })
}), { ...initialState });
