import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routeReducer as routing } from 'redux-simple-router'
import { createResponsiveStateReducer } from 'redux-responsive';
import app from './store/appReducers';
import sidebar from '../dashboard/navigation/sidebar/store/sidebarReducers';
import home from '../home/store/homeReducers';
import auth from '../auth/store/authReducers';
import devices from '../dashboard/devices/store/devicesReducers';
import { UNAUTH_USER } from '../auth/store/authTypes';
import api from '../utils/api';

const customBreakPoints = {
  palm: 719,
  lapAndUp: 1023
};

const appReducer = combineReducers({
  browser: createResponsiveStateReducer(customBreakPoints, { infinity: 'desktop' }),
  form,
  routing,
  app,
  sidebar,
  home,
  auth,
  devices
});

const rootReducer = (state, action) => {
  if (action.type === UNAUTH_USER) {
    state = undefined;
    api.setAuthenticationHeader(null);
  }
  return appReducer(state, action);
};

export default rootReducer;
