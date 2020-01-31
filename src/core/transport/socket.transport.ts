import io from 'socket.io-client';
import { config } from '@core/configs/transport.config';
import { transportModule } from "@core/modules/transport/root";

type SocketIO = typeof io.Socket;
const url = `${ process.env.PROTOCOL }://${ process.env.HOSTNAME }:${ process.env.PORT }`;

export class Initializer {
  static instance: SocketIO | undefined;
  static options: any;

  private constructor() {}

  public static setup(options: Record<string, any> = config) {
    Initializer.options = options;
    Initializer.instance = new io.Manager(url, Initializer.options).socket(transportModule.name)
  }

  public static getInstance(): SocketIO {
    if(!Initializer.instance) {
      Initializer.setup();
    }

    return Initializer.instance as SocketIO;
  }
}
