import { SET_IS_READY } from './appTypes';

export const setApplicationIsReady = (isReady) => {
  return (dispatch) => {
    dispatch({ type: SET_IS_READY, isReady });
  }
};