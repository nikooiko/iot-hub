import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routeReducer as routing } from 'redux-simple-router'
import auth from '../auth/authReducers';
import sidebar from '../navigation/sidebar/sidebarReducers';

const rootReducer = combineReducers({
  auth,
  form,
  routing,
  sidebar
});

export default rootReducer;
