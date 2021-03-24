interface StatusConditions {
  isShown: boolean
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
