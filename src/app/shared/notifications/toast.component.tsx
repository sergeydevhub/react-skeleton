import React, { SyntheticEvent } from "react";
import ReduxTypes from "ReduxTypes";
import clsx from "clsx";
import { config } from "@core/configs/notifications.config";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Error as ErrorIcon, Info as InfoIcon, Warning as WarningIcon } from "@material-ui/icons";
import { FormattedMessage, MessageDescriptor } from "react-intl";
import Snackbar from "@material-ui/core/Snackbar";
import { capitalize } from 'lodash';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { SnackbarContent, Slide, IconButton } from "@material-ui/core";
import {TransitionProps} from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./styles";

type State = {
  isShown: boolean;
};

const variantIcons = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon
};


type Props = {
  actions: ReduxTypes.RootAction;
  isShown: boolean;
  variant: keyof typeof variantIcons;
  message: MessageDescriptor
} & WithStyles<typeof styles>;

class ToastView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isShown: props.isShown
    }
  }

  private __handleClose(event: SyntheticEvent): void {
    event.preventDefault();

    this.setState({
      isShown: false
    });
  }

  render() {
    const { classes, variant } = this.props;
    const Icon = variantIcons[variant];

    const TransitionComponent = (props: TransitionProps) => <Slide { ...props } direction="up"/>;
    const { delay, vertical, horizontal } = config;

    return (
      <Snackbar
        onClose={ this.props.actions.hideNotification }
        open={ this.state.isShown }
        autoHideDuration={ delay }
        anchorOrigin={{
          vertical,
          horizontal,
        }}
        TransitionComponent={ TransitionComponent }
      >
        <SnackbarContent
          className={ clsx(classes[variant], classes.margin) }
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={ classes.message }>
            <Icon className={ clsx(classes.icon, classes.iconVariant) }/>
              <FormattedMessage { ...this.props.message }>
                { message => capitalize(message as string)}
              </FormattedMessage>
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={ this._handleClose }>
              <CloseIcon className={ classes.icon } />
            </IconButton>,
          ]}
        />
      </Snackbar>
    )
  }
}

const ToastViewComponent = withStyles(styles)(ToastView);

export {
  ToastViewComponent
}
