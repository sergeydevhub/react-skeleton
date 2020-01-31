import { Palette } from '@material-ui/core/styles/createPalette';
import { PaletteColor, PaletteColorOptions, PaletteOptions } from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    success: PaletteColor;
    warning: PaletteColor;
    text: TypeText & { link: string };
    black: string;
    white: string;
  }

  interface PaletteOptions {
    success?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    text?: Partial<TypeText> & { link: string };
    black?: string;
    white?: string;
  }
}
