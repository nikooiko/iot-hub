import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';

import App from './App.js';

// Components
import Login from '../auth/Login';
import Register from '../auth/Register';
import Auth from '../auth/Auth';
import AppContainer from '../layout/AppContainer';
import RequireAuth from '../auth/RequireAuth';
import RequireUnauth from '../auth/RequireUnauth';
import HomePage from '../pages/HomePage';
import Dashboard from '../dashboard/Dashboard';
import { closeSidebar } from '../navigation/sidebar/sidebarActions';

export default (store) => {
  const routeChangeHandler = () => {
    // if (store.getState().sidebar.opened) { // TODO decide if enabled or not
    //   store.dispatch(closeSidebar());
    // }
  };

  return (
    <Route path='/' component={App} onChange={routeChangeHandler}>
      <Route path='' component={AppContainer}>
        <IndexRoute components={HomePage}/>
        <Route path='dashboard' component={RequireAuth(Dashboard)} />
      </Route>
      <Route path='auth/' component={RequireUnauth(Auth)}>
        <IndexRedirect to='/'/>
        <Route path='login' component={Login} />
        <Route path='register' component={Register} />
      </Route>
      <Redirect path='*' to='/'/>
    </Route>
  );
};
