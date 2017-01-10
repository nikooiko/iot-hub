import api from '../../utils/api';
import { routerActions } from 'react-router-redux';

import { AUTH_USER, UNAUTH_USER } from './authTypes';
import { routeAfterAuth, routeAfterUnauth, loginRoute } from '../authConfig';

export const login = (credentials) => {
  return (dispatch) => {
    return api.post('/AppUsers/login' , credentials)
      .then(response => {
        const rememberMe = credentials.rememberMe;
        const accessToken = response.data.id;
        const user = {
          id: response.data.userId,
          username: credentials.username,
          isAdmin: (response.data.roles.indexOf('admin') != -1),
          token: response.data.user.jwt,
          accessToken
        };
        api.setAuthenticationHeader(accessToken);
        dispatch({ type: AUTH_USER, rememberMe, user });
        dispatch(routerActions.push(routeAfterAuth));
      });
  }
};

export const register = (form) => {
  return (dispatch) => {
    return api.post('/AppUsers', form)
      .then(() => {
        dispatch(routerActions.push(loginRoute));
      });
  }
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: UNAUTH_USER });
    dispatch(routerActions.push(routeAfterUnauth));
    return Promise.resolve();
  }
};

export const testToken = () => {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (auth.authenticated) {
      api.setAuthenticationHeader(auth.user.accessToken);
      const token = auth.user.token;
      return api.post('/AppUsers/testToken', { token })
        .catch(() => {
          // token is wrong or expired so unauth
          dispatch({ type: UNAUTH_USER });
        });
    }
    return Promise.resolve();
  }
};