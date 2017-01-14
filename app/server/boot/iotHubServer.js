'use strict';

const IotHub = require('../lib/IotHub');

module.exports = app => {
  app.once('started', () => {
    logger.info('Starting IotHub server...');
    app.iotHub = new IotHub(app); // Assign it  to app object to be available for user
  });
};
