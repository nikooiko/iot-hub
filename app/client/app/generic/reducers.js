import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from '../auth/authReducers';
import { routeReducer as routing } from 'redux-simple-router'

const rootReducer = combineReducers({
  auth,
  form,
  routing
});

export default rootReducer;
