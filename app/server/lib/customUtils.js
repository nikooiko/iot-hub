'use strict';

/**
 * @method httpError
 * @param {String} message The message creating the error body
 * @param {Number} [status=500] The status code that will be sent to the response
 * @param {String} code Alphanumerical ID for error code
 * @return {Error}
 */
function httpError(message, status = 500, code = null) {
  const err = new Error(message);
  if (code) {
    err.code = code;
  }
  err.status = err.statusCode = status;
  return err;
}

module.exports = {
  httpError
};
