import React from "react";
import { Avatar, Paper, withStyles, WithStyles } from "@material-ui/core";
import LockIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { default as LoginFormConnector } from "../../forms/login"
import styles from "./styles";

type Props = WithStyles<typeof styles> & {};
type State = {}

class LoginPageComponent extends React.Component<Props, State> {
  render() {
    const { classes } = this.props;
    return(
      <Paper className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockIcon />
        </Avatar>
        <LoginFormConnector />
      </Paper>
    )
  }
}

export default withStyles(
  styles
)(LoginPageComponent);
