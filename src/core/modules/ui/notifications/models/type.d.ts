import { IStatus } from "@core/helpers";

interface StatusConditions extends IStatus {
  isShown: boolean;
}

export interface Notification {
  status: StatusConditions,
  message: string
}

export interface Notifications {
  error: Notification;
  warning: Notification;
  info: Notification;
  success: Notification;
}
