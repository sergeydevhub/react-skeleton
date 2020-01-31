import {createMuiTheme, Theme} from "@material-ui/core";
import * as overrides from './overrides';
import palette from './palette.theme';
import typography from './typography.theme';

const theme: Theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export {
  theme
}

