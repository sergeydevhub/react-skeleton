import React from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import FormIncompletePromptComponent from './form-incomplete-prompt.component';
import messages from './messages';

type Props = RouteComponentProps<{}>;
type State = {
  isShown: boolean
};

class FormIncompleteContainer extends React.Component<Props, State> {
  state = {
    isShown: false
  };

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if(this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        isShown: !this.state.isShown
      })
    }
  }

  render() {
    if(this.state.isShown) {
      return (
        <FormIncompletePromptComponent message={messages.prompt}/>
      )
    }
  }
}

export default withRouter(FormIncompleteContainer);
