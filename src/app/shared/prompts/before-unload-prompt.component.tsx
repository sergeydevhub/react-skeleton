import React from 'react';
import { capitalize } from 'lodash';
import { FormattedMessage } from "react-intl";
import { Prompt } from 'react-router';
import messages from './messages';

type Props = {};

type State = {
  isRefused: boolean;
  isShown: boolean
}

class BeforeUnloadPromptComponent extends React.Component<Props, State> {
  state: State = {
    isRefused: false,
    isShown: false
  };

  beforeUnloadHandler = (e: Event) => {
    e.preventDefault();
    this.setState({
      isShown: !this.state.isShown
    })
  };

  conmponentDidMount() {
    window.addEventListener('beforeunload', this.beforeUnloadHandler)
  }

  componentWillMount(): void {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler)
  }

  render() {
    return (
      <FormattedMessage {...messages.prompt}>{
          translate => <Prompt when={this.state.isShown} message={( capitalize(translate as string) )}/>
      }</FormattedMessage>
    )
  }
}

export {
  BeforeUnloadPromptComponent
};
