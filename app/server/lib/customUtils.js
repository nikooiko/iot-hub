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

/**
 * Find the collection name of the passed model
 *
 * @method getModelCollection
 * @param {Model} model The model that we want to get the collection from
 * @return {Collection} The mongodb Collection
 */
function getModelCollection(model) {
  const modelDataSource = model.dataSource;
  model.dataSource.once('connected', () => { // get the db collection to use for ops
    try {
      model.dbCollection = modelDataSource.connector.collection((model.modelName));
      return model.dbCollection; // return the name
    } catch (err) {
      err.description = `Error while trying to get db collection for ${model.modelName}`;
      throw err;
    }
  });
}

module.exports = {
  httpError,
  getModelCollection
};
