import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routeReducer as routing } from 'redux-simple-router'
import { createResponsiveStateReducer } from 'redux-responsive';
import auth from '../auth/store/authReducers';
import sidebar from '../dashboard/navigation/sidebar/sidebarReducers';
import home from '../home/store/homeReducers';
import app from './store/appReducers';

const customBreakPoints = {
  palm: 719,
  lapAndUp: 1023
};

const rootReducer = combineReducers({
  browser: createResponsiveStateReducer(customBreakPoints, { infinity: 'desktop' }),
  auth,
  form,
  routing,
  sidebar,
  home,
  app
});

export default rootReducer;
