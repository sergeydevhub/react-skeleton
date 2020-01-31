import React from 'react';
import {WithStyles} from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import styles from './styles';

type State = {};
type Props = & WithStyles<typeof styles>;

class Layout extends React.Component<Props, State> {
  render() {
    const { classes } = this.props;

    return (
     <main className={ classes.wrapper }>
       <div className={ classes.root }>
         { this.props.children }
       </div>
     </main>
    )
  }
}

export default withStyles(styles)(Layout);

