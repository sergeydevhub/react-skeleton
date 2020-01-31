import React from 'react';
import { withStyles } from '@material-ui/styles';
import {Grid, Typography} from '@material-ui/core';
import { WithStyles } from '@material-ui/core';
import { FormattedMessage } from "react-intl";
import styles from './styles';
import messages from './messages';

type Props = WithStyles<typeof styles>
type State = {};

class NotFoundPageComponent extends React.PureComponent<Props, State> {
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
            <Typography variant='h1'>
              <FormattedMessage { ...messages.notFound }>
                { message => ( message as string ).toUpperCase() }
              </FormattedMessage>
            </Typography>
          </div>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(NotFoundPageComponent);
