import ReduxTypes from 'ReduxTypes';
import { Notifications, Notification } from './models';
import { ReduxModuleHelper } from "@core/helpers";
import {Draft, produce} from "immer";
import {Reducer} from "redux";
import { RootError } from "@core/errors/variations";

class NotificationsModule extends ReduxModuleHelper {}
const notificationsModule = new NotificationsModule('notifications');

const getInstance = (state: ReduxTypes.RootState) => state.ui.notifications;

const selectors = {
  getInstance
};

const filterVariant = (state: Notifications): string => {
  let result: string;
  Object.values(state).filter((key: keyof Notifications) => state[key].status.isShown && (result = key));

  return result;
};

const filters = {
  filterVariant
};

interface NotificationPayload {
  variant: keyof Notifications,
  message: string | RootError
}

const showNotification = notificationsModule.sync<NotificationPayload>('show');
const hideNotification = notificationsModule.sync<keyof Notifications>('hide');

const actions = {
 showNotification,
 hideNotification
};

type RootAction = ReturnType<
  ReduxTypes.InferActions<typeof actions>
>

const initCondition: Notification = {
  message: '',
  status: {
    isShown: false
  }
};

const initialState: Notifications = {
  error: initCondition,
  success: initCondition,
  warning: initCondition,
  info: initCondition
};

const reducer: Reducer = (
  state: Notifications = initialState,
  action: RootAction
) => produce(state, (draft: Draft<Notifications>) => {
  const variant: keyof Notifications = action.payload.variant;

  const handlers = {
    [showNotification.type]: () => {
      draft[variant] = {
        message: action.payload.message,
        status: { isShown: true }
      };
    },

    [hideNotification.type]: () => {
      draft = initialState;
    }
  };

  if(action.type in handlers) {
    handlers[action.type]()
  }
});

export {
  filters,
  actions,
  selectors,
  notificationsModule,
  NotificationsModule,
  reducer,
  initialState
}
