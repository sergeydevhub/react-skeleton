const config = {
  transport: ['websocket'],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1500,
  timeout: 15000
};

enum Events {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  RECONNECT_ATTEMPT = 'reconnect_attempt',
  RECONNECT = 'reconnect',
  RECONNECT_ERROR = 'reconnect_error',
  LOGIN = 'login',
  LOGOUT = 'logout',
  VERIFY_USER = 'verify_user'
}

export {
  config,
  Events
}
