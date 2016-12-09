'use strict';

// TODO fix

/**
 * This script will be responsible for cleaning up expired user tokens, since loopback does not
 * provide any mechanism
 */

const Days = 1;
const cleanInterval = Days * 24 * 60 * 60 * 1000; // 1 day Period in ms. (Days * HH *MM *SS * SSS)

/**
 * Find and delete all expired user tokens
 *
 * @method clearExpiredTokens
 * @param {AccessToken} AccessToken
 */
function clearExpiredUserTokens(AccessToken) {
  // Find all tokens created from the default ttl and further ago.
  const defaultTtl = AccessToken.app.models.AppUser.settings.ttl;
  const maxAgoDate = new Date(new Date().getTime() - (defaultTtl * 1000));
  logger.info(`Clearing tokens older than ${maxAgoDate}`);
  AccessToken.destroyAll({ created: { lte: maxAgoDate } })
    .catch(err => {
      logger.error({ err }, 'Error while trying to clean up expired tokens');
    });
}

module.exports = app => {
  // const AccessToken = app.models.AccessToken;
  // if (!AccessToken) {
  //   logger.error('No Access token to clean up expired tokens. Something went wrong. Will exit...');
  //   return setTimeout(process.exit, 1000, 1);
  // }
  // // Set the interval for cleaning up tokens
  // return setInterval(clearExpiredUserTokens, cleanInterval, AccessToken);
};
