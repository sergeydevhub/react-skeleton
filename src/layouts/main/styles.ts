import {createStyles, Theme,} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    justifyContent: 'center'
  },
});

export default styles;
