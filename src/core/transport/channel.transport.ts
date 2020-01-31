import io from 'socket.io-client';
import { call, put, cancelled, take } from 'redux-saga/effects';
import { actions, Models } from '@core/modules/ui/notifications'
import { eventEmitter } from "./event-emmiter.transport";
import { Initializer } from "@core/transport/socket.transport";
import {TransportError} from "@core/errors/variations";
import { WSStatusCodes } from "@core/configs/ws-statuses.config";

export function * channel() {
  Initializer.setup();

  const socket: typeof io.Socket = Initializer.getInstance();
  socket.connect();

  const channel = yield call(eventEmitter, socket);
  while(true) {
    try {
      const action = yield take(channel);
      yield put(action);
    } catch({ message }) {
      const variant: keyof Models.Notifications = 'error';
      const transportError = new TransportError(WSStatusCodes.INTERNAL_ERROR, message);
      const payload = { variant, message };
      yield put(actions.showNotification({ payload }));
      throw transportError;
    } finally {
      if(yield cancelled()) {
        channel.close();
      }
    }
  }
}
