'use strict';

const socketIo = require('socket.io');
const tokenHandler = require('./tokenHandler');

const ownersPath = '/owners';
const devicesPath = '/devices';

class IotHub {
  constructor(app) {
    this.app = app;
    this.server = socketIo(app.server);
    this.setupSocketAuthentication();
    this.setupOwnersEndpoints();
    this.setupDevicesEndpoints();
    // TODO mark all devices as offline on boot.
  }

  setupSocketAuthentication() {
    // setup middleware on default namespace since all connections pass through here
    this.server.use(tokenHandler.socketAuthMiddleware);
  }

  setupOwnersEndpoints() {
    logger.info(`Owner sockets are accepted on ${ownersPath}`);
    this.server
      .of(ownersPath)
      .use(this.validateToken('owner'))
      .on('connection', socket => {
        logger.info(`Owner with ID ${socket.decoded_token.userId} connected.`);
        // TODO event handlers
      })
      .on('error', err => {
        logger.error({ err }, 'Error with owner socket');
      });
  }

  setupDevicesEndpoints() {
    logger.info(`Device socket are accepted on ${devicesPath}`);
    this.server
      .of(devicesPath)
      .use(this.validateToken('device'))
      .on('connection', socket => {
        logger.info(`Device with ID ${socket.decoded_token.deviceId} connected.`);
        this.app.models.Device.updateStatus(socket.decoded_token.deviceId, 'online')
          .then(() => {
            logger.info(`Updated status of device ${socket.decoded_token.deviceId} successfully`);
          })
          .catch((err) => {
            logger.error({ err });
          });
        socket.on('data', (deviceData) => {
          const deviceId = deviceData.deviceId;
          const data = deviceData.data;
          logger.info({ data }, `Received data from device ${deviceId}`);
          this.app.models.Device.updateData(deviceId, data)
            .then(() => {
              logger.info(`Updated data of device ${deviceId} successfully`);
            })
            .catch((err) => {
              logger.error({ err });
            });
        });
        socket.on('disconnect', () => {
          logger.info(`Device with ID ${socket.decoded_token.deviceId} disconnected.`);
          this.app.models.Device.updateStatus(socket.decoded_token.deviceId, 'offline')
            .then(() => {
              logger.info(`Updated status of device ${socket.decoded_token.deviceId} successfully`);
            })
            .catch((err) => {
              logger.error({ err });
            });
        });
      })
      .on('error', err => {
        logger.error({ err }, 'Error with device socket');
      });
  }

  validateToken(tokenType) {
    return (socket, next) => {
      const invalidTokenError = new Error('Invalid Token.');
      const token = this.server.sockets.connected[socket.client.id].decoded_token;
      // validate token based on type
      switch (tokenType) {
        case 'device':
          if (!token.hasOwnProperty('deviceId') || !token.hasOwnProperty('userId')) {
            return next(invalidTokenError);
          }
          break;
        case 'owner':
          if (!token.hasOwnProperty('userId')) {
            return next(invalidTokenError);
          }
          break;
        default:
          return next(new Error('Did not select a proper token type to check against'));
      }
      socket.decoded_token = token;
      return next(); // All good
    };
  }
}

module.exports = IotHub;
