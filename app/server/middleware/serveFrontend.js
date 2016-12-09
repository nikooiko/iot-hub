'use strict';

/**
 * This function will serve the front end applications.
 *
 * See: [Loopback Middleware](https://docs.strongloop.com/display/public/LB/Defining+middleware)
 */
module.exports = () => (req, res) => {
  const url = req.originalUrl;
  if (
    url.startsWith('/login') || url.startsWith('/register') || url.startsWith('/forgotPassword')
  ) {
    res.render('public/index');
  } else if (url.startsWith('/admin')) {
    res.render('appAdmin/index');
  } else {
    res.render('appUser/index');
  }
};
