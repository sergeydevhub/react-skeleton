import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { WithStyles } from '@material-ui/core';
import { FormattedMessage } from "react-intl";
import styles from './styles';
import messages from './messages';

export type ComponentProps = WithStyles<typeof styles>
export type ComponentState = {};

class ErrorPageComponent extends React.PureComponent<ComponentProps, ComponentState> {
  render() {
    const { classes } = this.props;

    return (
      <Typography variant='h1'>
        <FormattedMessage { ...messages.notFound }>
          { message => ( message as string ).toUpperCase() }
        </FormattedMessage>
      </Typography>
    )
  }
}

export default withStyles(styles)(ErrorPageComponent);
