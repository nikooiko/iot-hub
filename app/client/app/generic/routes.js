import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './App.js';
import NotFoundPage from '../pages/NotFoundPage.js';

// Components
import Login from '../auth/Login.js';
import Register from '../auth/Register.js';
import RequireAuth from '../auth/RequireAuth.js';
import RequireUnauth from '../auth/RequireUnauth.js';
// import HomePage from './components/pages/home-page';
import Dashboard from '../dashboard/Dashboard.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={RequireUnauth(Login)} />
    <Route path="login" component={RequireUnauth(Login)} />
    <Route path="register" component={RequireUnauth(Register)} />
    <Route path="dashboard" component={RequireAuth(Dashboard)} />
    <Redirect path="*" to="/login"/>
    {/*<Route path="*" component={NotFoundPage} />*/}
  </Route>
);
