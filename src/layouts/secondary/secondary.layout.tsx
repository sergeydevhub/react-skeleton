import React from 'react';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import {Grid } from "@material-ui/core";
import styles from "./styles";

export type LayoutProps = WithStyles<typeof styles>;
export type LayoutState = {};

class SecondaryLayout extends React.PureComponent<LayoutProps, LayoutState> {
  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.root }>
        <Grid
          container
          justify="center"
          spacing={4}
        >
          <div className={ classes.content }>
            { this.props.children }
          </div>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(SecondaryLayout);
