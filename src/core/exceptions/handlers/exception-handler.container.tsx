import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FormattedMessage } from "react-intl";
import { actions as notificationActions } from '@modules/ui/notifications'
import * as Sentry from '@sentry/browser';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import messages from './messages';

const mapDispatchToProps = {
  ...notificationActions
};

const connector = connect(null, mapDispatchToProps);

type State = {
  error: Error | undefined | null;
  event: ReturnType<typeof Sentry.captureException> | undefined;
}

type Props = & ConnectedProps<typeof connector>

class ExceptionHandlerContainer extends React.Component<Props, State> {
  readonly state: State = {
    error: undefined,
    event: undefined
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({error});

    Sentry.withScope((scope: Sentry.Scope) => {
      const { componentStack } = errorInfo;
      scope.setExtras({ componentStack });
      const event = Sentry.captureException(errorInfo);
      this.setState({ event });
    });

    this.props.show({
      variant: 'error',
      message: error.message
    })
  }

  render() {
    if (this.state.error) {
      return (
        <Paper>
          <FormattedMessage { ...messages.common }>
            { message => ( message as string ).toUpperCase() }
          </FormattedMessage>
          <Divider />
        </Paper>
      )
    }

   return this.props.children
  }
}

export default connector(ExceptionHandlerContainer);
