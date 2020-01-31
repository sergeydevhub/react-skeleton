import React from 'react';
import { paths } from "@core/configs/router-paths.config";
import {Redirect, RedirectProps, Route, RouteProps} from "react-router";

type RouteGuardResult = boolean;

type RouteGuard = {
  routeGuard: () => RouteGuardResult
}

type RedirectOnDenied = string | RedirectProps | undefined;

interface RoutingProps extends RouteProps {}

export type Props = RouteGuard & RoutingProps & {
  redirectOnDenied?: RedirectOnDenied
};

type State = {
  redirectOnDenied: RedirectOnDenied;
  isAllowed: boolean
}

class ProtectedRoute extends React.PureComponent<Props, State> {
  state: State = {
    redirectOnDenied: undefined,
    isAllowed: false
  };

  componentDidMount(): void {
    this.setState({
      redirectOnDenied: this.props.redirectOnDenied || paths.LOGIN
    });

    const isAllowed = this.props.routeGuard();

    if(isAllowed) {
      this.setState({
        isAllowed
      })
    }
  }

  render() {
    if(this.state.isAllowed) {
      const { redirectOnDenied, routeGuard, ...rest } = this.props;
      return !React.Children.count(this.props.children)
      ? ( <Route { ...rest }/> )
      : this.props.children
    }

    if(typeof this.state.redirectOnDenied === 'string') {
      return (
        <Redirect to={{
          pathname: this.state.redirectOnDenied,
        }} />
      )
    }

    const redirectProps = this.state.redirectOnDenied as RedirectProps;

    return (
      <Redirect { ...redirectProps }/>
    )
  }
}

export default ProtectedRoute;
