import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './styles.css';

type Props = RouteComponentProps<{}> & {
  enter: number,
  exit: number,
}

type State = {}

class TransitionRouting extends React.Component<Props, State> {
  render(): React.ReactNode {
    const { enter, exit } = this.props;

    return (
      <TransitionGroup>
        <CSSTransition
          key={ this.props.location.key }
          classNames="fade"
          timeout={{ enter, exit }}
        >
          { this.props.children }
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default withRouter(TransitionRouting);
