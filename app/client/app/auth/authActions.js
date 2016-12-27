import api from '../utils/api';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router'; // TODO a better way

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './authTypes';

const errorHandler = (dispatch, error, type) => {
  let errorMessage = error.message;

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logout();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
};

export const login = (credentials) => {
  return (dispatch) => {
    return api.post('/AppUsers/login' , credentials)
      .then(response => {
        cookie.save('token', response.data.user.jwt, { path: '/' });
        dispatch({ type: AUTH_USER });
        browserHistory.push('/dashboard');
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
        cookie.save('token', response.data.user.jwt, { path: '/' });
        dispatch({ type: AUTH_USER });
        browserHistory.push('/dashboard');
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
    browserHistory.push('/login');
    return Promise.resolve();
  }
};

export const testToken = () => {
  return (dispatch) => {
    const token = cookie.load('token');
    return api.post('/AppUsers/testToken', { token })
      .then(() => {
        dispatch({ type: AUTH_USER });
      })
      .catch((err) => {
        console.log(err);
        // token is wrong so just remove from cookies.
        cookie.remove('token', { path: '/' });
      });
  }
};