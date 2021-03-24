export type TAvailableLangs = 'en' | 'ru'
export type TAvailableLocales = 'en_US' | 'ru_RU';

export const DEFAULT_LANG: TAvailableLangs = 'en';

export const LOCALES: Record<TAvailableLangs, TAvailableLocales> = {
  en: 'en_US',
  ru: 'ru_RU'
};

