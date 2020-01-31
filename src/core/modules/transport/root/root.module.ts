import {ReduxModuleHelper, defaultStatus, StatefulActionCreators } from "@core/helpers";
import ReduxTypes from 'ReduxTypes';
import StoreModels from 'StoreModels';
import { Conditions } from "./models";
import { RootError, TransportError } from "@core/errors/variations";
import {Reducer} from "redux";
import produce, {Draft} from "immer";

class TransportModule extends ReduxModuleHelper {}
const transportModule = new TransportModule('transport');

const connect: StatefulActionCreators = (() => {
  const creator = transportModule.async('connect');
  const { triggered } = creator.constructTriggered<Pick<Conditions, 'isConnecting'>>();
  const { successful } = creator.constructSuccessful<Pick<Conditions, 'isOpen'>>();
  const { failure } = creator.constructFailure<TransportError>();

  return {
    triggered,
    successful,
    failure
  }
})();

const reconnect: StatefulActionCreators = (() => {
  const creator = transportModule.async('reconnect');
  const { triggered } = creator.constructTriggered<number>();
  const { successful } = creator.constructSuccessful<Pick<Conditions, 'isOpen'>>();
  const { failure } = creator.constructFailure<RootError>();

  return {
    triggered,
    successful,
    failure
  }
})();

const disconnect = transportModule.sync<Pick<Conditions, 'isClosed'>>('disconnect');
const messageReceive = transportModule.sync<string>('receive');

const messageSend: StatefulActionCreators = (() => {
  const creator = transportModule.async('send');
  const { triggered } = creator.constructTriggered<string>();
  const { successful } = creator.constructSuccessful<number>();
  const { failure } = creator.constructFailure<TransportError>();

  return {
    triggered,
    successful,
    failure
  }
})();

const actions = {
  connect,
  reconnect,
  disconnect,
  messageReceive,
  messageSend
};

const readyState: Conditions = {
  isConnecting: false,
  isOpen: false,
  isClosing: false,
  isClosed: true,
  isReconnecting: false
};

const initialState: StoreModels.Transport = {
  readyState,
  status: defaultStatus
};

const reducer: Reducer = (
  state: StoreModels.Transport = initialState,
  action: ReduxTypes.RootAction
) => produce(state, (draft: Draft<StoreModels.Transport>) => {
  const handlers = {
    [connect.triggered.type]: () => {
      const condition = {
        ...readyState,
        isConnecting: true
      };

      draft.readyState = Object.assign(condition, action.payload);
    },

    [connect.successful.type]: () => {
      const condition = {
        ...readyState,
        isOpen: true,
        isClosed: false
      };

      draft.readyState = Object.assign(condition, action.payload);
    },

    [connect.failure.type]: () => {
      draft.error = action.payload;

      draft.readyState = readyState
    },

    [reconnect.triggered.type]: () => {
      draft.readyState = {
        ...readyState,
        isReconnecting: true
      };
    },

    [reconnect.successful.type]: () => {
      draft.readyState = {
        ...readyState,
        isOpen: true
      };
    },

    [reconnect.failure.type]: () => {
      draft.error = action.payload;

      draft.readyState = readyState
    },

    [disconnect.type]: () => {
      draft.readyState = readyState
    }
  };

  if(action.type in handlers) {
    handlers[action.type]();

    if('status' in action) {
      draft.status = action.status
    }
  }
});

export {
  TransportModule,
  transportModule,
  actions,
  reducer,
  initialState
}
