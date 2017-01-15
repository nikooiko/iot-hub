import api from '../../utils/api';
import { SET_DEVICES_COUNT, SET_IS_FETCHING } from './dashboardTypes';

// Sync Action Creators
export const setIsFetching = (isFetching) => {
  return { type: SET_IS_FETCHING, isFetching };
};

export const setDevicesCount = (devicesCount) => {
  return { type: SET_DEVICES_COUNT, devicesCount };
};

// Async Action Creators
export const fetchDevicesCount = () => {
  return (dispatch, getState) => {
    // check if already fetching to avoid race conditions
    if (getState().dashboard.isFetching) {
      return Promise.resolve();
    }

    return api.get('/Devices/getMyDevicesCount')
      .then((response) => {
        const devicesCount = response.data.devicesCount;
        dispatch(setDevicesCount(devicesCount));
        dispatch(setIsFetching(false));
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(setIsFetching(false));
        // TODO
      });
  };
};
