'use strict';

/**
 * This module will contain the functionality required to handle JWT token authentication
 */
const jwt = require('jsonwebtoken');
const socketioJwt = require('socketio-jwt');
const utils = require('./customUtils.js');

const secretKey = process.env.secretKey || 'secretKey';
const issuer = 'IotHubWebServer';
const defaultTokenDuration = 21600;

/**
 * Return an object with token options specified in module
 *
 * @method getTokenOptions
 * @return {Object}
 */
function getTokenOptions() {
  return {
    issuer
  };
}

/**
 * Create a JWT token according to type selected
 *
 * @method createToken
 * @param {Object} payload The payload object to sign
 * @param {Number} [expiresIn = defaultTokenDuration] Number of seconds the token is valid for.
 * @return {Promise}
 */
function createToken(payload, expiresIn = defaultTokenDuration) {
  if (!payload) {
    return Promise.reject(new Error('Cannot sign empty payload'));
  }
  const tokenOptions = {
    expiresIn,
    issuer
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, tokenOptions, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
}

/**
 * Verify the token given based on its type (device | user)
 *
 * @method verifyToken
 * @param {String} token The JWT string token
 * @return {Promise}
 */
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    const verifyOptions = getTokenOptions();
    jwt.verify(token, secretKey, verifyOptions, (err, decodedToken) => {
      if (err) {
        return reject(err);
      }
      return resolve(decodedToken);
    });
  });
}

/**
 * Accept a token and refresh its expiration time. Will only accept valid and acceptable tokens.
 *
 * @method refreshToken
 * @param {String} token The token to refresh expiration
 * @param {Number} [expiresIn = defaultTokenDuration] Number of seconds the token is valid for
 * @return {Promise}
 */
function refreshToken(token, expiresIn = defaultTokenDuration) {
  const propertiesToRemove = ['exp', 'iat', 'iss'];
  return verifyToken(token)
    .then((decodedToken) => {
      const length = propertiesToRemove.length - 1;
      let i = -1;
      // Remove auto assigned properties from token
      while (i++ < length) {
        delete decodedToken[propertiesToRemove[i]];
      }
      return createToken(decodedToken, expiresIn);
    });
}

/**
 * Accept an HTTP request object and return the JWT token if present. Will return null if not there.
 * Will check in the default location for JWT in AUTHORIZATION header with Bearer prefix
 *
 * @method extractJwtFromReq
 * @param {http.IncomingMessage} req The HTTP request object
 * @return {String|null} The JWT token extracted or null if not found
 */
function extractJwtFromReq(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null; // No authorization header in request so no token
  const authParts = authHeader.split(' ');
  if (authParts.length !== 2) return null; // Wrong format
  if (authParts[0] !== 'Bearer') return null; // Empty Bearer prefix
  return authParts[1];
}

/**
 * Function that will accept a request object, extract the token from the request and verify it.
 * In case of success it will return the decoded_token extracted from JWT. If it fails, it will
 * return the appropriate error according to the stage of failure.
 *
 * @method verifyReq
 * @param {http.IncomingMessage} req The HTTP request object
 * @return {Promise}
 */
function verifyReq(req) {
  const token = extractJwtFromReq(req);
  if (!token) { // Check for non existing token
    return Promise.reject(utils.httpError('Token present in request', 401,
      'AUTHORIZATION_REQUIRED')); // Comply with Loopback error codes
  }
  // Token present
  return verifyToken(token);
}

// Create socket middleware
const authOps = getTokenOptions();
Object.assign(authOps, { secret: secretKey, handshake: true });
const socketAuthMiddleware = socketioJwt.authorize(authOps);

module.exports = {
  createToken,
  verifyToken,
  refreshToken,
  decode: jwt.decode,
  socketAuthMiddleware,
  extractJwtFromReq,
  verifyReq
};
