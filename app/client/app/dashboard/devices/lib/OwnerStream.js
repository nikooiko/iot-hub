import io from 'socket.io-client';
import msgTypes from '../../../../../server/lib/msgTypes';
import { store } from '../../../core/Root';
import { updateDevice, setDevice } from '../store/devicesActions';

const iotHubMsgTypes = msgTypes.iotHubMsgTypes;
const ownersPath = '/owners';

class OwnerStream {
  constructor() {
    this.socket = io(ownersPath, {
      reconnection: true,
      reconnectionDelay: 5000,
      autoConnect: false
    });
    this.setupSocket();
  }

  connectSocket() {
    const socket = this.socket;
    const token = store.getState().auth.user.token;
    socket.io.opts.query = `token=${token}`;
    socket.connect();
  }

  setupSocket() {
    const socket = this.socket;
    socket.on('connect', () => {
      console.info('Connected to hub as owner.');
    });
    socket.on('message', (message) => {
      switch (message.type) {
        case iotHubMsgTypes.newDevice:
          console.debug('Received new device message');
          store.dispatch(setDevice(message.device));
          break;
        case iotHubMsgTypes.devStatusChange:
          console.debug('Received device status change');
          store.dispatch(updateDevice(message.deviceId, { status: message.status }));
          break;
        case iotHubMsgTypes.devData:
          console.debug('Received device data');
          store.dispatch(updateDevice(message.deviceId, { lastData: message.data }));
          break;
        default:
          console.error('Owner\'s stream received unsupported message.');
      }
    });
    socket.on('disconnect', () => {
      console.info('Disconnected from hub');
    });
  }

  sendMessageToIotHub(message) {
    this.socket.emit('message', message);
  }

  start() {
    this.connectSocket();
  }

  stop() {
    this.socket.disconnect();
  }
}

export default OwnerStream;
