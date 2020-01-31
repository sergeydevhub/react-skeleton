import React from 'react';
import { ToastViewComponent } from './toast.component';
import { actions, selectors, filters, Models } from '@core/modules/ui/notifications';
import ReduxTypes from 'ReduxTypes';
import { connect, ConnectedProps } from 'react-redux';
import {MessageDescriptor} from "react-intl";

const mapStateToProps = (state: ReduxTypes.RootState ) => {
  const notifications = selectors.getInstance(state);
  const variant = filters.filterVariant(notifications);
  const message = notifications[variant] ? notifications[variant].message : '';

  return {
    variant,
    message
  }
};

const mapDispatchToProps = {
  ...actions
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

type State = {};

class ToastContainer extends React.Component<Props, State> {
  render() {
    if(this.props.variant) {
      const message: MessageDescriptor = { id: this.props.message };
      const { hideNotification } = this.props;

      return (
        <ToastViewComponent
          message={ message }
          variant={( this.props.variant as keyof Models.Notifications)}
          isShown={ Boolean(this.props.variant) }
          actions={{ hideNotification }}
        />
      )
    }

    return null;
  }
}


export default connector(ToastContainer);
