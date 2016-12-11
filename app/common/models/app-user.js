'use strict';

const jwt = require('jsonwebtoken');

const secret = 'secret';

// TODO fix
// const Promise = require('bluebird');
// const utils = require('../../server/lib/customUtils.js');
// const token = require('../../server/lib/token.js');

/**
 * Our main User Model that extends from the Loopback Built in User model. It will contain all the
 * functionality required by our app. Defined according to Loopback Creating Model Configuration,
 * [See here](https://docs.strongloop.com/display/public/LB/Creating+models)
 *
 * @class AppUser
 * @constructor
 * @extends loopback.User
 * @property {ObjectId} id
 * @property {String} username Must be unique.
 * @property {String} password Hidden from remote clients.
 * @property {String} email Must be valid email.
 * @property {UserProfile} userProfile The embedded document holding profile info for the user
 * @property {UserConfiguration} userConf The embedded document holding user configuration
 */
module.exports = (AppUser) => {
// TODO Delete these routes
  AppUser.afterRemote('login', (ctx, result, next) => {
    // TODO recreate
    const token = jwt.sign({ userId: result.userId }, secret);
    if (!result.__data.user) {
      result.__data.user = { jwt: token };
    } else {
      result.__data.user.jwt = token;
    }
    next();
    // Promise.all([
    //   AppUser.getUserRoles(result.userId),
    //   token.createToken({ userId: result.userId, type: 'user' })
    // ])
    //   .then(([roles, createdToken]) => {
    //     result.roles = roles;
    //     if (!result.__data.user) {
    //       result.__data.user = { jwt: createdToken };
    //     } else {
    //       result.__data.user.jwt = createdToken;
    //     }
    //   })
  });

  AppUser.remoteMethod('testToken', {
    description: 'The functionality used to test a user\'s token',
    http: {
      verb: 'post',
      status: 200,
      errorStatus: 400,
    },
    isStatic: true,
    accepts: [{
      arg: 'token',
      type: 'string',
      description: 'The previous user token that needs to be tested',
      required: true
    }],
    returns: [{
      arg: 'decoded_token',
      description: 'The decoded token',
      type: 'object'
    }]
  });

  AppUser.testToken = (token, cb) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return cb(new Error('Token is invalid'));
      }
      return cb(null, decoded);
    });
  };


  // utils.disableUnusedRemotes(AppUser); // Disable unneeded remote hooks
  // /**
  //  * Disable Unused remote hooks as configured in loopback models. `disableRemoteMethod` is a
  //  * Loopback way of not exposing model methods to public API
  //  */
  // AppUser.disableRemoteMethod('findOne', true);
  // // Disable AccessToken related remote methods for user
  // AppUser.disableRemoteMethod('__count__accessTokens', false);
  // AppUser.disableRemoteMethod('__create__accessTokens', false);
  // AppUser.disableRemoteMethod('__delete__accessTokens', false);
  // AppUser.disableRemoteMethod('__destroyById__accessTokens', false);
  // AppUser.disableRemoteMethod('__findById__accessTokens', false);
  // AppUser.disableRemoteMethod('__get__accessTokens', false);
  // AppUser.disableRemoteMethod('__updateById__accessTokens', false);
  // // Disable update configuration of user because of the way loopback replaces embedded model
  // // AppUser.disableRemoteMethod('__update__configuration', false);
  // // Disable delete of sensor Ranges in user configuration
  // AppUser.disableRemoteMethod('__delete__configuration__sensorRanges', false);
  // // Disable delete of custom fields in user configuration
  // AppUser.disableRemoteMethod('__delete__configuration__customFields', false);
  // // Disable delete method of all assets
  // AppUser.disableRemoteMethod('__delete__assets', false);
  // // Disable delete method of all gateways
  // AppUser.disableRemoteMethod('__delete__gateways', false);
  // // Disable delete method of all processes
  // AppUser.disableRemoteMethod('__delete__processes', false);
  // // Disable delete method of all sensors
  // AppUser.disableRemoteMethod('__delete__sensors', false);
  //
  // /**
  //  * Ensure that user configuration defaults to empty Object. `observe` is Loopback way of hooks
  //  */
  // AppUser.observe('before save', (ctx, next) => {
  //   if (ctx.instance && !ctx.instance.userConf) {
  //     ctx.instance.userConf = {};
  //   }
  //   return next();
  // });
  // /**
  //  * Define a Loopback property getter for user configuration, to make sure that even deeper level
  //  * embedded models are initialized correctly
  //  */
  // AppUser.getter.userConf = function getUserConf() {
  //   return this.__data && this.__data.userConf ? this.configuration.build(this.__data.userConf) :
  //     undefined;
  // };
  //
  // // Remote Methods
  //
  // /**
  //  * Setup the remote method for refreshing user token. This is done in the Loopback way of
  //  * declaring Remote Methods. `refreshToken` is declared as a static method in **AppUser** and here
  //  * is the needed configuration to expose it as an API method in AppUser API
  //  * See https://docs.strongloop.com/display/public/LB/Remote+methods
  //  */
  // AppUser.remoteMethod('refreshToken', {
  //   description: 'The functionality used to a refresh a user\'s token for the web app',
  //   http: {
  //     verb: 'post',
  //     status: 200,
  //     errorStatus: 400
  //   },
  //   isStatic: true,
  //   accepts: [{
  //     arg: 'token',
  //     description: 'The previous user token that needs to be refreshed',
  //     http: {
  //       source: 'form'
  //     },
  //     required: true,
  //     type: 'string'
  //   }],
  //   returns: [{
  //     arg: 'token',
  //     description: 'The refreshed token',
  //     type: 'string'
  //   }]
  // });
  //
  // /**
  //  * Restrict modification of properties whose edit is only to be allowed for admin. Add a hook that
  //  * is executed before a remote method is called
  //  * See https://docs.strongloop.com/display/public/LB/Remote+hooks
  //  */
  // AppUser.beforeRemote('**', (ctx, result, next) => {
  //   // Check if we need can access anyway as an admin
  //   const isAdmin = utils.isAdminToken(ctx.req.accessToken);
  //   const methodStringName = ctx.method.stringName; // get method string name
  //   const methodName = methodStringName.substr(methodStringName.lastIndexOf('.') + 1);
  //   const updateData = ctx.args.data;
  //   if (methodName === 'updateAttributes' && updateData && updateData.userConf) {
  //     delete updateData.userConf;
  //     return next(); // do not allow the update of user document with user configuration no matter
  //   }
  //   if (isAdmin) return next(); // no need to check if admin
  //   // No admin
  //   switch (methodName) {
  //     case 'create':
  //       if (updateData.userConf && updateData.userConf.activatedSensors) {
  //         delete updateData.userConf.activatedSensors;
  //       }
  //       break;
  //     case '__create__processes':
  //     case '__update__processes':
  //     case '__create__configuration':
  //     case '__update__configuration':
  //       if (updateData.activatedSensors) {
  //         delete updateData.activatedSensors;
  //         if (updateData.hasOwnProperty('__data')) {
  //           delete updateData.__data.activatedSensors;
  //         }
  //       }
  //       break;
  //     case '__updateById__sensors':
  //       if (updateData.deviceConf) {
  //         delete updateData.deviceConf;
  //         delete updateData.gatewayId;
  //         if (updateData.hasOwnProperty('__data')) {
  //           delete updateData.__data.deviceConf;
  //           delete updateData.__data.gatewayId;
  //         }
  //       }
  //       break;
  //     default: // Other method... don't care
  //       return next();
  //   }
  //   return next(); // Continue
  // });
  //
  // /**
  //  * Remote hook for auto assigning CustomField propertyName if not already set in the post data.
  //  * See https://docs.strongloop.com/display/public/LB/Remote+hooks
  //  */
  // AppUser.beforeRemote('prototype.__create__configuration__customFields', ctx => {
  //   // Check if property name is set
  //   const user = ctx.instance;
  //   const newField = ctx.args.data;
  //   if (newField.propertyName) return Promise.resolve(); // propertyName already set
  //   // we need to generate the field
  //   newField.propertyName = user.getNextCustomFieldName(newField.category);
  //   return Promise.resolve();
  // });
  //
  // /**
  //  * Send back to client the roles of the logged in user, in order to facilitate the redirecting
  //  * of the user to the corresponding web app. Also attach the jwt token that the user will be able
  //  * to use. It is defined as a hook to be executed after the remote method **login** is executed.
  //  * Loopback hooks for remote methods: https://docs.strongloop.com/display/public/LB/Remote+hooks
  //  *
  //  * result will contain a **roles** array with all the roles for the user
  //  */
  // AppUser.afterRemote('login', (ctx, result) => Promise.all([
  //     AppUser.getUserRoles(result.userId),
  //     token.createToken({ userId: result.userId, type: 'user' })
  //   ])
  //     .then(([roles, createdToken]) => {
  //       result.roles = roles;
  //       if (!result.__data.user) {
  //         result.__data.user = { jwt: createdToken };
  //       } else {
  //         result.__data.user.jwt = createdToken;
  //       }
  //     })
  // );
  // // Static Methods
  // /**
  //  * @method getUserRoles
  //  * @param {ObjectID} userId The userId to get Roles for
  //  * @return {Promise} A promise that will resolve with an array of Roles for the user.
  //  * @static
  //  */
  // AppUser.getUserRoles = function getUserRoles(userId) {
  //   const appModels = this.app.models; // Get reference to app models
  //   const Role = appModels.Role;
  //   const RoleMapping = appModels.RoleMapping;
  //   return new Promise((resolve, reject) => {
  //     Role.getRoles({ principalType: RoleMapping.USER, principalId: userId }, (err, roles) => {
  //       if (err) {
  //         return reject(err);
  //       }
  //       const rolesToResolve = [];
  //       roles.forEach((role, index) => {
  //         if (role.hasOwnProperty('id')) { // Probably objectId... stupid...
  //           const roleFn = Role.findById(role)
  //             .then(foundRole => {
  //               roles[index] = foundRole.name;
  //             });
  //           rolesToResolve.push(roleFn);
  //         }
  //       });
  //       if (rolesToResolve.length === 0) {
  //         return resolve(roles);
  //       }
  //       return Promise.all(rolesToResolve)
  //         .then(() => resolve(roles));
  //     });
  //   });
  // };
  //
  // /**
  //  * Provide a token, check validity and refresh its expiration for the provided or default period
  //  * of time.
  //  * @method refreshToken
  //  * @static
  //  * @param {String} tokenToRefresh
  //  * @param {Function} [cb] The callback that will be used to pass results to remote loopback method
  //  * @return {Promise | Number} Will resolve or reject with result of token refresh, nothing in cb
  //  */
  // AppUser.refreshToken = function refreshToken(tokenToRefresh, cb) {
  //   const cbWrapper = utils.cbPromiseWrapper(cb);
  //   const opPromise = token.refreshToken(tokenToRefresh)
  //     .then(newToken => cbWrapper(null, newToken))
  //     .catch(cbWrapper);
  //   if (!cb) return opPromise;
  //   return 0;
  // };
};
