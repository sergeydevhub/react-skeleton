import {ActionCreator, Reducer} from 'redux';
import { ReduxModuleHelper } from "@core/helpers/redux";
import { ObjectRepositoryHelper } from "@core/helpers/redux/state";
import { Notifications, Notification } from './data';
import {BaseAction} from "@core/helpers/redux/actions";

type State = Notifications;

const initCondition: Notification = {
  message: '',
  status: {
    isShown: false
  }
};

const initialState: State = {
  error: initCondition,
  success: initCondition,
  warning: initCondition,
  info: initCondition
};

interface NotificationPayload {
  variant: keyof Notifications,
  message: string
}

const notificationsModule = new ReduxModuleHelper<State>('notifications', ObjectRepositoryHelper);

const show = notificationsModule.sync<NotificationPayload>(['show']);
const hide = notificationsModule.sync<keyof Notifications>(['hide']);

export const rootReducer: Reducer<State, BaseAction> = notificationsModule.reducer(
  (repository: ObjectRepositoryHelper<State>) => ({
  [show.type]: (
    state: State = initialState,
    action: ReturnType<typeof show>
  ) => repository.update({
    status: { isShown: true },
    message: action.payload.message
  }, action.payload.variant),

  [hide.type]: (
    state: State = initialState,
    action: ReturnType<typeof hide>
  ) => repository.update(initialState[action.payload], action.payload)
}), initialState);

export const actions = {
  show,
  hide
};
