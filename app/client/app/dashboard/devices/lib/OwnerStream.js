import io from 'socket.io-client';
import msgTypes from '../../../../../server/lib/msgTypes';
import { store } from '../../../core/Root';

const ownersPath = '/owners';

class OwnerStream {
  constructor() {
    const token = store.getState().auth.user.token;
    this.socket = io(ownersPath, { query: `token=${token}` });
    this.reconnectInterval = 5000;
    this.shouldReconnect = true;
    this.setupSocket();
  }

  reconnectSocket() {
    const token = store.getState().auth.user.token;
    this.socket.io.opts.query = `token=${token}`;
    this.socket.connect();
  }

  setupSocket() {
    const socket = this.socket;
    socket.on('connect', () => {
      console.info('Connected to hub as owner.');
    });
    socket.on('message', (message) => {
      switch (message.type) {
        case msgTypes.devStatusChange:
          console.debug('Received device status change');
          break;
        case msgTypes.devData:
          console.debug('Received device data');
          break;
        default:
          console.error('Owner\'s stream received unsupported message.');
      }
    });
    socket.on('disconnect', () => {
      console.info('Disconnected from hub');
      if (this.shouldReconnect) {
        console.info(`Will retry reconnect to hub in ${this.reconnectInterval}`);
        setTimeout(() => this.reconnectSocket(), this.reconnectInterval);
      }
    });
  }

  destroy() {
    const socket = this.socket;
    this.shouldReconnect = false;
    socket.disconnect();
  }
}

export default OwnerStream;
