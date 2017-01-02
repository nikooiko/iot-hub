import { REQUEST_USERS_PER_CONTINENT } from './homeTypes';

const INITIAL_STATE = {
  users: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case REQUEST_USERS_PER_CONTINENT:
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
}
