import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';

// Components
import App from './App.js';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Auth from '../auth/Auth';
import Dashboard from '../dashboard/Dashboard';
import RequireAuth from '../auth/RequireAuth';
import RequireUnauth from '../auth/RequireUnauth';
import Home from '../home/Home';
import AboutUs from '../aboutUs/AboutUs';
import DashboardIndex from '../dashboard/DashboardIndex';
import Devices from '../dashboard/devices/Devices';
import Device from '../dashboard/devices/device/Device';

export default (store) => {
  const routeChangeHandler = () => {
    // if (store.getState().sidebar.opened) { // TODO decide if enabled or not
    //   store.dispatch(closeSidebar());
    // }
  };

  return (
    <Route path='/' component={App} onChange={routeChangeHandler}>
      <IndexRoute components={RequireUnauth(Home)}/>
      <Route path='' component={RequireAuth(Dashboard)}>
        <Route path='dashboard' component={DashboardIndex} />
        <Route path='devices' component={Devices}>
          <Route path=':deviceId' component={Device} />
        </Route>
      </Route>
      <Route path='auth/' component={RequireUnauth(Auth)}>
        <IndexRedirect to='/'/>
        <Route path='login' component={Login} />
        <Route path='register' component={Register} />
      </Route>
      <Route path='aboutUs' components={RequireUnauth(AboutUs)}/>
      <Redirect path='*' to='/'/>
    </Route>
  );
};
