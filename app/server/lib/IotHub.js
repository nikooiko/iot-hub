'use strict';

const socketIo = require('socket.io');
const tokenHandler = require('./tokenHandler');
const ownersMsgTypes = require('./msgTypes').ownersMsgTypes;
const iotHubMsgTypes = require('./msgTypes').iotHubMsgTypes;

const ownersPath = '/owners';
const devicesPath = '/devices';

const adminRoom = 'admin';

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
        const userId = socket.decoded_token.userId;
        logger.info(`Owner with ID ${userId} connected.`);
        // check if isAdmin in order to join admin's rooms
        this.app.models.AppUser.getUserRoles(userId)
          .then((roles) => {
            const isAdmin = (roles.indexOf('admin') !== -1);
            let room = userId;
            if (isAdmin) {
              room = 'admin';
            }
            socket.join(room, (err) => {
              if (err) {
                logger.error(`Socket with ID ${socket.id} failed to join room '${room}'.`);
                socket.disconnect();
                return;
              }
              logger.info(`Socket with ID ${socket.id} joined room '${room}'.`);
            });
          });

        socket.on('message', (message) => {
          let deviceId;
          switch (message.type) {
            case ownersMsgTypes.updateDevice:
              deviceId = message.deviceId;
              this.app.models.Device.updateDevice(deviceId, message.data)
                .then((device) => {
                  logger.info(`Updated device ${deviceId} successfully`);
                  const msg = {
                    type: iotHubMsgTypes.newDevice,
                    device
                  };
                  if (!device.activated) {
                    this.disconnectDevice(device.id);
                  }
                  this.sendMessageToOwner(userId, msg);
                })
                .catch((err) => {
                  logger.error({ err });
                });
              break;
            default:
              logger.error(`Received unsupported message from owner ${userId}.`);
          }
        });
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
        this.app.models.Device.updateDevice(socket.decoded_token.deviceId, { status: 'online' })
          .then(() => {
            const deviceId = socket.decoded_token.deviceId;
            logger.info(`Updated status of device ${deviceId} successfully`);
            const message = {
              type: iotHubMsgTypes.devStatusChange,
              deviceId,
              status: 'online'
            };
            this.sendMessageToOwner(socket.decoded_token.userId, message);
          })
          .catch((err) => {
            logger.error({ err });
          });
        socket.on('data', (deviceData) => {
          const deviceId = socket.decoded_token.deviceId;
          const data = deviceData.data;
          logger.info({ data }, `Received data from device ${deviceId}`);
          this.app.models.Device.updateDevice(deviceId, { data })
            .then(() => {
              logger.info(`Updated data of device ${deviceId} successfully`);
              const message = {
                type: iotHubMsgTypes.devData,
                deviceId,
                data
              };
              this.sendMessageToOwner(socket.decoded_token.userId, message);
              return Promise.resolve();
            })
            .catch((err) => {
              logger.error({ err });
            });
        });
        socket.on('disconnect', () => {
          const deviceId = socket.decoded_token.deviceId;
          logger.info(`Device with ID ${deviceId} disconnected.`);
          this.app.models.Device.updateDevice(deviceId, { status: 'offline' })
            .then(() => {
              logger.info(`Updated status of device ${deviceId} successfully`);
              const message = {
                type: iotHubMsgTypes.devStatusChange,
                deviceId,
                status: 'offline'
              };
              this.sendMessageToOwner(socket.decoded_token.userId, message);
              return Promise.resolve();
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

  sendMessageToOwner(userId, message) {
    const strUserId = userId.toString();
    this.server.of(ownersPath).to(strUserId).emit('message', message);
    // also send to admin
    this.server.of(ownersPath).to(adminRoom).emit('message', message);
  }

  disconnectDevice(deviceId) {
    const connected = this.server.nsps[devicesPath].connected;
    let i = -1;
    const socketIds = Object.keys(connected);
    const len = socketIds.length - 1;
    while (i++ < len) {
      const socket = connected[socketIds[i]];
      if (socket.decoded_token.deviceId === deviceId) {
        socket.disconnect();
      }
    }
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
