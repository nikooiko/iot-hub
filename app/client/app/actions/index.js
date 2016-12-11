import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router'; // TODO a better way

import { AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  PROTECTED_TEST } from './types';

const CLIENT_ROOT_URL = 'http://localhost:3000';
const API_URL = `${CLIENT_ROOT_URL}/api`; // TODO get from config?

export function errorHandler(dispatch, error, type) {
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
}

export function login(credentials) {
  return (dispatch) => {
    return axios.post(`${API_URL}/AppUsers/login`, credentials)
      .then(response => {
        cookie.save('token', response.data.user.jwt, { path: '/' });
        dispatch({ type: AUTH_USER });
        browserHistory.push('/dashboard');
      })
      .catch((err) => {
        errorHandler(dispatch, err, AUTH_ERROR)
      });
  }
}

export function register(form) {
  return (dispatch) => {
    axios.post(`${API_URL}/AppUsers`, form)
      .then(response => {
        cookie.save('token', response.data.user.jwt, { path: '/' });
        dispatch({ type: AUTH_USER });
        browserHistory.push('/dashboard');
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
    browserHistory.push('/login');
    return Promise.resolve();
  }
}

export function testToken() {
  return (dispatch) => {
    const token = cookie.load('token');
    return axios.post(`${API_URL}/AppUsers/testToken`, { token })
      .then(() => {
        dispatch({ type: AUTH_USER });
      })
      .catch((err) => {
        console.log(err);
        // token is wrong so just remove from cookies.
        cookie.remove('token', { path: '/' });
      });
  }
}