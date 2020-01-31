import React from 'react';
import clsx from 'clsx';
import {AppBar, WithStyles, withStyles} from "@material-ui/core";
import { Toolbar, IconButton, Badge } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './styles';

type UIConditions = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

type Props = WithStyles<typeof styles> & {
  ui: UIConditions
};

type State = {};

class HeaderLayout extends React.PureComponent<Props, State> {
  render() {
    const { classes, ui } = this.props;

    return (
      <AppBar position="absolute" className={clsx(classes.appBar, ui.isSidebarOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={ui.toggleSidebar}
            className={clsx(classes.menuButton, ui.isSidebarOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(HeaderLayout);
