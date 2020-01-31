import { ActionError } from "@core/errors/variations";
import { IStatus, Status } from "@core/helpers";

export interface Conditions extends IStatus {
  isConnecting: boolean;
  isOpen: boolean;
  isReconnecting: boolean;
  isClosing: boolean;
  isClosed: boolean;
}

declare module 'StoreModels' {
  export interface Transport {
    readyState: Conditions,
    error?: ActionError
    status: Status
  }
}
