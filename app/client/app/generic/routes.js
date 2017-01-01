import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';

// Components
import App from './App.js';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Auth from '../auth/Auth';
import AppContainer from '../layout/AppContainer';
import RequireAuth from '../auth/RequireAuth';
import RequireUnauth from '../auth/RequireUnauth';
import HomePage from '../pages/HomePage';
import Dashboard from '../content/Dashboard';
import Devices from '../content/devices/Devices';

export default (store) => {
  const routeChangeHandler = () => {
    // if (store.getState().sidebar.opened) { // TODO decide if enabled or not
    //   store.dispatch(closeSidebar());
    // }
  };

  return (
    <Route path='/' component={App} onChange={routeChangeHandler}>
      <IndexRoute components={RequireUnauth(HomePage)}/>
      <Route path='' component={RequireAuth(AppContainer)}>
        <Route path='dashboard' component={Dashboard} />
        <Route path='devices' component={Devices} />
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
