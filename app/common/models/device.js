'use strict';

const utils = require('../../server/lib/customUtils');
const tokenHandler = require('../../server/lib/tokenHandler');

module.exports = (Device) => {
  /**
   * Setup the remote method for logging the device in. This is done in the Loopback way of
   * declaring Remote Methods. `login` is declared as a static method in **Device** and here
   * is the needed configuration to expose it as an API method in Device API
   * See https://docs.strongloop.com/display/public/LB/Remote+methods
   */
  Device.remoteMethod('login', {
    description: 'The login functionality for devices to receive token for server communication',
    http: {
      verb: 'post',
      status: 200,
      errorStatus: 401
    },
    isStatic: true,
    accepts: [{
      arg: 'deviceId',
      description: 'The device Identification used to receive the token',
      required: true,
      type: 'string'
    }, {
      arg: 'ownerId',
      description: 'The owner id of the device',
      required: true,
      type: 'string'
    }],
    returns: [{
      arg: 'token',
      description: 'The token created after device login',
      type: 'string'
    }]
  });

  /**
   * Login a device and receive an access token to use for further server communication
   * @method login
   * @static
   * @param {String} deviceId The id of device trying to login.
   * @param {String} ownerId The id of the owner of this device.
   * @param {Function} cb The callback that will be used to pass results to remote loopback method
   * on remote
   */
  Device.login = (deviceId, ownerId, cb) => {
    if (!deviceId) {
      const err = utils.httpError(
        'Should provide deviceId',
        404,
        'DeviceNotFound'
      );
      cb(err);
      return;
    } else if (!ownerId) {
      const err = utils.httpError(
        'Should provide ownerId',
        404,
        'DeviceNotFound'
      );
      cb(err);
      return;
    }

    Device.findOne({ where: { id: deviceId, userId: ownerId } }, {
      fields: { id: true, activated: true, userId: true }
    }).then(device => {
      if (!device) {
        // Device not exist so create it as deactivated
        Device.app.models.AppUser.findById(ownerId, {
          fields: { id: true }
        }).then(user => {
          if (!user) {
            const err = utils.httpError(
              'Owner not found',
              404,
              'OwnerNotFound'
            );
            cb(err);
            return;
          }
          Device.create({ id: deviceId, userId: ownerId, activated: false, status: 'offline' })
            .then(() => {
              const err = utils.httpError(
                'Device is not activated for communication',
                401,
                'DeviceNotActivated'
              );
              return cb(err);
            })
            .catch(cb);
        });
        return;
      }
      // Device found, check for activation
      if (!device.activated) {
        const err = utils.httpError(
          'Device is not activated for communication',
          401,
          'DeviceNotActivated'
        );
        cb(err);
        return;
      }
      // Device is active
      tokenHandler.createToken({ userId: device.userId, deviceId: device.id, type: 'device' })
        .then(createdToken => cb(null, createdToken))
        .catch(cb);
    })
    .catch(cb);
  };

  /**
   * Setup the remote method for a user to get his devices. This is done in the Loopback way of
   * declaring Remote Methods. `getMyDevices` is declared as a static method in **Device** and here
   * is the needed configuration to expose it as an API method in Device API
   * See https://docs.strongloop.com/display/public/LB/Remote+methods
   */
  Device.remoteMethod('getMyDevices', {
    description: 'The login functionality for devices to receive token for server communication',
    http: {
      verb: 'get',
      status: 200
    },
    isStatic: true,
    accepts: [{
      arg: 'loggedUser',
      description: 'The logged in user information',
      type: 'object'
    }],
    returns: [{
      arg: 'devices',
      description: 'The devices that belong to logged in user',
      type: 'object'
    }]
  });

  Device.getMyDevices = (loggedUser, cb) => {
    const userId = loggedUser.userId; // no need to check loggedUser because it's checked at before
    Device.app.models.AppUser.getUserRoles(userId)
      .then((roles) => {
        const isAdmin = (roles.indexOf('admin') !== -1);
        let promise;
        if (isAdmin) {
          // Get all devices
          promise = Device.find({});
        } else {
          // Otherwise get user's devices
          promise = Device.find({ where: { userId } });
        }
        promise.then((devices) => {
          cb(null, devices);
        });
      })
      .catch(cb);
  };

  Device.beforeRemote('getMyDevices', (ctx, user, next) => {
    // Check for normal user access
    const accessToken = ctx.req.accessToken;
    const methodStringName = ctx.method.stringName;
    const methodName = methodStringName.substr(methodStringName.lastIndexOf('.') + 1);
    if (!accessToken) {
      return next(new Error(
        `Request reached remote hook for ${methodName} in ${Device.modelName} without token`
      ));
    }
    ctx.args.loggedUser = {};
    ctx.args.loggedUser.userId = accessToken.userId;
    return next();
  });

  Device.updateStatus = (deviceId, status) => Device.findById(deviceId)
    .then((device) => {
      if (!device) {
        return Promise.reject(
          new Error(`Device with ID ${deviceId} not found to update status`)
        );
      }
      return device.updateAttributes({ status }, (err) => {
        if (err) {
          return Promise.reject(
            new Error(`Failed to update status for device with ID ${deviceId}`)
          );
        }
        return Promise.resolve();
      });
    });

  Device.updateData = (deviceId, data) => Device.findById(deviceId)
    .then((device) => {
      if (!device) {
        return Promise.reject(
          new Error(`Device with ID ${deviceId} not found to data`)
        );
      }
      return device.updateAttributes({ lastData: data }, (err) => {
        if (err) {
          return Promise.reject(
            new Error(`Failed to update data for device with ID ${deviceId}`)
          );
        }
        return Promise.resolve();
      });
    });

  // Validations
  Device.validatesInclusionOf('status', {
    in: ['online', 'offline'],
    message: 'invalid status'
  });
};
