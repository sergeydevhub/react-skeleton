import React from 'react';
import {Grid, Container, WithStyles, withStyles} from "@material-ui/core";
import { SidebarLayout } from './sidebar';
import { HeaderLayout } from './header';
import { withToggle, InjectedProps } from "@core/hocs";
import styles from './styles';

//TODO include withToggle and it InjectedProps
type Props = WithStyles<typeof styles> & {};

type State = {
  isToggledOn: boolean
}

class MainLayout extends React.PureComponent<Props, State> {
  state: State = {
    isToggledOn: false
  };

  toggle = (): void => {
    this.setState({
      isToggledOn: !this.state.isToggledOn
    })
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <HeaderLayout
          ui={{
            isSidebarOpen: this.state.isToggledOn,
            toggleSidebar: this.toggle
          }}
        />
        <SidebarLayout
          ui={{
            isOpen: this.state.isToggledOn,
            toggle: this.toggle
          }}
        />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              { this.props.children }
            </Grid>
          </Container>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(MainLayout);
