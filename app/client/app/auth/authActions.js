import api from '../utils/api';
import { routeActions } from 'redux-simple-router'

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './authTypes';
import { routeAfterAuth, routeAfterUnauth } from './authConfig';

const errorHandler = (dispatch, error, type) => {
  let errorMessage = error.message;

  if(error.status === 401) {
    dispatch({
      type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logout();
  } else {
    dispatch({
      type,
      payload: errorMessage
    });
  }
};

export const login = (credentials) => {
  return (dispatch) => {
    return api.post('/AppUsers/login' , credentials)
      .then(response => {
        const rememberMe = credentials.rememberMe;
        dispatch({ type: AUTH_USER, jwt: response.data.user.jwt, rememberMe });
        dispatch(routeActions.push(routeAfterAuth));
      })
      .catch((err) => {
        errorHandler(dispatch, err, AUTH_ERROR)
      });
  }
};

export const register = (form) => {
  return (dispatch) => {
    api.post('/AppUsers', form)
      .then(response => {
        dispatch({ type: AUTH_USER, jwt: response.data.user.jwt });
        dispatch(routeActions.push(routeAfterAuth));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: UNAUTH_USER });
    dispatch(routeActions.push(routeAfterUnauth));
    return Promise.resolve();
  }
};

export const testIfAuthenticated = () => {
  return (dispatch, getState) => {
    const token = getState().auth.jwt;
    if (token) {
      return api.post('/AppUsers/testToken', { token })
        .catch(() => {
          // token is wrong or expired so unauth
          dispatch({ type: UNAUTH_USER });
        });
    }
    return Promise.resolve();
  }
};