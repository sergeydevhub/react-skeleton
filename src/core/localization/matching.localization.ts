import * as mainLocale from "./locales/en";
import { flatten } from "@core/utils";

type DeepObject = Record<string, any>;

const localesIntersection = (
  locale: DeepObject, rootLocale: DeepObject = mainLocale,
): Extract<typeof locale, typeof rootLocale> => {
  const result: DeepObject = {};
  for(let prop in locale) {
    if(rootLocale.hasOwnProperty(prop)) {
      result[prop] = rootLocale[prop];
    }
  }

  return Object.assign(locale, result) as typeof locale;
};

const prepareTranslation = (
  locale: DeepObject
): Record<string, string> => {
  const intersection: typeof locale = localesIntersection(locale);
  return flatten(intersection);
};

export default prepareTranslation;
export {
  localesIntersection
}
