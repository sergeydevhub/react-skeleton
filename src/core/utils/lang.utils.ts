import {DEFAULT_LANG, TAvailableLangs} from "@core/configs/localization.config";

export const getPredefinedLanguage = (): TAvailableLangs => {
  const { languages } = navigator;
  if(languages && languages.length > 0) {
    return languages[0] as TAvailableLangs
  }

  return DEFAULT_LANG;
};
