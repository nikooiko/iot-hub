import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './App.js';

// Components
import Login from '../auth/Login.js';
import Register from '../auth/Register.js';
import Container from '../layout/Container';
import RequireAuth from '../auth/RequireAuth.js';
import RequireUnauth from '../auth/RequireUnauth.js';
import HomePage from '../pages/HomePage';
import Dashboard from '../dashboard/Dashboard.js';
import { closeSidebar } from '../navigation/sidebar/sidebarActions';

export default (store) => {
  const routeChangeHandler = () => {
    if (store.getState().sidebar.opened) {
      store.dispatch(closeSidebar());
    }
  };

  return (
    <Route path='/' component={App} onChange={routeChangeHandler}>
      <Route path='' component={Container}>
        <IndexRoute components={HomePage}/>
        <Route path='' component={HomePage}/>
        <Route path='dashboard' component={RequireAuth(Dashboard)} />
      </Route>
      <Route path='login' component={RequireUnauth(Login)} />
      <Route path='register' component={RequireUnauth(Register)} />
      <Redirect path='*' to='/'/>
    </Route>
  );
};
