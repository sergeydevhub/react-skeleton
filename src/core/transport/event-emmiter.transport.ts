import client from 'socket.io-client';
import { actions as transportActions } from '@core/modules/transport/root';
import { eventChannel, buffers } from 'redux-saga';
import { Events } from '@core/configs/transport.config';
import {RootError} from "@core/errors/variations";

const BUFFER_SIZE = 100;

export const eventEmitter = (
  socket: typeof client.Socket
) => eventChannel(emitter => {
  const payload = {
    isOpen: socket.connected,
    isClosed: socket.disconnected,
  };

  socket
    .on(Events.CONNECTION, () => emitter(
      transportActions.connect.successful({ payload })
    )
  ).on(Events.DISCONNECT, () => emitter(
      transportActions.disconnect({ payload })
    )
  ).on(Events.MESSAGE, (message: string) => emitter(
      transportActions.messageReceive({ payload: message })
    )
  ).on(Events.RECONNECT_ATTEMPT, () => emitter(
      transportActions.reconnect.triggered({
        payload: client.Socket.io.opts.reconnectionAttempts as number,
        meta: {
          timestamp: Date.now()
        }
      })
    )
  ).on(Events.RECONNECT, () => emitter(
      transportActions.reconnect.successful({
        payload: client.Socket.io.opts.reconnectionAttempts as number
      })
    )
  ).on(Events.RECONNECT_ERROR, (error: RootError) => emitter(
      transportActions.reconnect.failure({ error })
    )
  );

  return socket.disconnect;
}, buffers.expanding(BUFFER_SIZE));
