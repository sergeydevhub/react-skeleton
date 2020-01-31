import { createStyles, Theme } from '@material-ui/core';

const styles = ({ spacing, palette }: Theme) => createStyles({
  wrapper: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    justifyContent: "center",
    background: "#424242",
  },
  root: {
    maxWidth: "400px"
  }
});

export default styles
