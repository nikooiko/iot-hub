import { SET_IS_READY } from './appTypes';

const INITIAL_STATE = {
  isReady: true
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_IS_READY:
      return { ...state,
        isReady: action.isReady
      };
    default:
      return state;
  }
}
