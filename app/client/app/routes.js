import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app.jsx';
import NotFoundPage from './components/pages/not-found-page.jsx';

// Components
import Login from './components/auth/login.jsx';
import Register from './components/auth/register.jsx';
import RequireAuth from './components/auth/require-auth.jsx';
import RequireUnauth from './components/auth/require-unauth.jsx';
// import HomePage from './components/pages/home-page';
import Dashboard from './components/dashboard.jsx';
// import RequireAuth from './components/auth/require-auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={RequireUnauth(Login)} />
    <Route path="login" component={RequireUnauth(Login)} />
    <Route path="register" component={RequireUnauth(Register)} />
    <Route path="dashboard" component={RequireAuth(Dashboard)} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);
