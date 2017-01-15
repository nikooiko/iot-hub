import { SET_DEVICES_COUNT, SET_IS_FETCHING} from './dashboardTypes';

const INITIAL_STATE = {
  devicesCount: null,
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_DEVICES_COUNT:
      return { ...state,
        devicesCount: action.devicesCount
      };
    case SET_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
}
