'use strict';

const SocketServer = require('../lib/IotHub');

module.exports = app => {
  app.once('started', () => {
    logger.info('Starting Socket.IO server...');
    app.io = new SocketServer(app); // Assign it  to app object to be available for user
  });
};
