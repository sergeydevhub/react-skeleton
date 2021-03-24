export type TThemeStatusConditions = {
  isActive: boolean
};

export type TThemeStatus = {
  status: TThemeStatusConditions
}

export type TTheme = {
  dark: TThemeStatus;
  light: TThemeStatus;
}
