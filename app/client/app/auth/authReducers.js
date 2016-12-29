import { AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR } from './authTypes';

const INITIAL_STATE = {
  error: '',
  authenticated: false,
  jwt: null,
  rememberMe: false,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH_USER:
      return { ...state,
        error: '',
        authenticated: true,
        jwt: action.jwt,
        rememberMe: action.rememberMe,
        user: action.user
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false, jwt: null, user: null};
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
