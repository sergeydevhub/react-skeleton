import {createStyles, Theme} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${ theme.spacing(2) }px ${ theme.spacing(3) }px ${ theme.spacing(3) }px`,
    background: "#3c3c3c"
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
});

export default styles;
