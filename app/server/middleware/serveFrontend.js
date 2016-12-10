'use strict';

const path = require('path');
/**
 * This function will serve the front end applications.
 *
 * See: [Loopback Middleware](https://docs.strongloop.com/display/public/LB/Defining+middleware)
 */
module.exports = () => (req, res) => {
  if (process.env.UNDER_DEVELOPMENT) {
    res.sendFile(path.join(__dirname + '/../../client/dev-index.html'));
  } else {
    res.sendFile(path.join(__dirname + '/../../client/index.html'));
  }
};
