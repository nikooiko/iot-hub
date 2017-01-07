'use strict';

const Promise = require('bluebird');
const getModelCollection = require('../../server/lib/customUtils').getModelCollection;
const tokenHandler = require('../../server/lib/tokenHandler');

module.exports = (AppUser) => {
  AppUser.dbCollection = null; // Placeholder for getting direct access to the db collection
  AppUser.once('dataSourceAttached', (attachedModel) => {
    getModelCollection(attachedModel);
    attachedModel.ObjectId = attachedModel.dataSource.ObjectID; // get ObjectId constructor
  });

  AppUser.afterRemote('login', (ctx, result) =>
    tokenHandler.createToken({ userId: result.userId })
      .then((token) =>
        AppUser.getUserRoles(result.userId)
          .then((roles) => {
            result.roles = roles;
            if (!result.__data.user) {
              result.__data.user = { jwt: token };
            } else {
              result.__data.user.jwt = token;
            }
          })
      )
  );

  AppUser.remoteMethod('testToken', {
    description: 'The functionality used to test a user\'s token',
    http: {
      verb: 'post',
      status: 200,
      errorStatus: 400
    },
    isStatic: true,
    accepts: [{
      arg: 'token',
      type: 'string',
      description: 'The previous user token that needs to be tested',
      required: true
    }],
    returns: []
  });

  AppUser.testToken = (token, cb) => {
    tokenHandler.verifyToken(token)
      .then(() => cb(null))
      .catch(cb);
  };

  AppUser.remoteMethod('populationPerContinent', {
    description: 'The functionality get number of users per continent',
    http: {
      verb: 'post',
      status: 200,
      errorStatus: 400
    },
    isStatic: true,
    accepts: [],
    returns: [{
      arg: 'populationPerContinent',
      description: 'An object that holds each continent and the number of users that belong to it',
      type: 'object'
    }]
  });

  AppUser.populationPerContinent = (cb) => {
    AppUser.dbCollection.aggregate({
      $group: { _id: '$continent', population: { $sum: 1 } }
    }, (err, res) => {
      if (err) {
        return cb(err);
      }
      const populationPerContinent = {
        NorthAmerica: 0,
        SouthAmerica: 0,
        Europe: 0,
        Africa: 0,
        Australia: 0,
        Asia: 0
      };
      let i = -1;
      const len = res.length - 1;
      while (i++ < len) {
        const continent = res[i];
        populationPerContinent[continent._id] = continent.population;
      }
      return cb(null, populationPerContinent);
    });
  };

  // Static methods
  /**
   * @method getUserRoles
   * @param {ObjectID} userId The userId to get Roles for
   * @return {Promise} A promise that will resolve with an array of Roles for the user.
   * @static
   */
  AppUser.getUserRoles = function getUserRoles(userId) {
    const appModels = this.app.models;
    const Role = appModels.Role;
    const RoleMapping = appModels.RoleMapping;
    return new Promise((resolve, reject) => {
      Role.getRoles({ principalType: RoleMapping.USER, principalId: userId }, (err, roles) => {
        if (err) {
          return reject(err);
        }
        const rolesToResolve = [];
        roles.forEach((role, index) => {
          if (role.hasOwnProperty('id')) {
            const roleFn = Role.findById(role)
              .then(foundRole => {
                roles[index] = foundRole.name;
              });
            rolesToResolve.push(roleFn);
          }
        });
        if (rolesToResolve.length === 0) {
          return resolve(roles);
        }
        return Promise.all(rolesToResolve)
          .then(() => resolve(roles));
      });
    });
  };

  // Validations
  AppUser.validatesInclusionOf('continent', {
    in: ['NorthAmerica', 'SouthAmerica', 'Europe', 'Africa', 'Australia', 'Asia'],
    message: 'invalid continent'
  });
};
