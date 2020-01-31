import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {Divider, Drawer, IconButton } from '@material-ui/core';
import { WithStyles, withStyles } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import styles from './styles';

type UIConditions = {
  isOpen: boolean;
  toggle: () => void;
}

type Props = WithStyles<typeof styles> & {
  ui: UIConditions
}

class SidebarLayout extends React.Component<Props, {}> {
  render() {
    const { classes, ui } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawer, !ui.isOpen && classes.drawerClose),
        }}
        open={ui.isOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={ui.toggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
      </Drawer>
    )
  }
}

export default connect()(
  withStyles(
    styles
  )(SidebarLayout)
);


