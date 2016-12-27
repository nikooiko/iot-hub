import { AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR } from './authTypes';

const INITIAL_STATE = {
  error: '',
  content: '',
  authenticated: false,
  jwt: null,
  rememberMe: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH_USER:
      return { ...state,
        error: '',
        authenticated: true,
        jwt: action.jwt,
        rememberMe: action.rememberMe
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false, jwt: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
