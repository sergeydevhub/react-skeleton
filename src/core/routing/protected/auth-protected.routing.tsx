import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProps } from "react-router";
import ProtectedRoute from './protected.routing';
import { IProfile, selectors } from '@modules/profile/root';
import * as ReduxTypes from "ReduxTypes";

const mapStateToProps = (state: ReduxTypes.RootState) => ({
  status: selectors.getStatus(state)
});

const connector = connect(mapStateToProps);

type Props = RouteProps & ConnectedProps<typeof connector>;
type State = {};

class AuthProtectedRoute extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  checkAccess = () => !this.props?.status?.isGuest;

  render() {
    return (
      <ProtectedRoute { ...this.props } routeGuard={ this.checkAccess }>
        { this.props.children }
      </ProtectedRoute>
    )
  }
}

export default connector(AuthProtectedRoute);
