import { SnackbarOrigin } from '@material-ui/core/Snackbar';

interface NotificationsConfig extends SnackbarOrigin {
  delay: number;
}

const config: NotificationsConfig = {
  delay: 5000,
  vertical: 'top',
  horizontal: 'right'
};

export {
  config
}
