import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles( ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    textAlign: 'center'
  },
}));

export default styles;
