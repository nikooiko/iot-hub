import api from '../../../utils/api';
import { SET_DEVICES, SET_DEVICE, SET_IS_FETCHING } from './devicesTypes';

// Sync Action Creators
export const setIsFetching = (isFetching) => {
  return { type: SET_IS_FETCHING, isFetching };
};

export const setDevice = (device) => {
  return { type: SET_DEVICE, device };
};

export const setDevices = (devices) => {
  return { type: SET_DEVICES, devices };
};

// Async Action Creators
export const fetchDevices = () => {
  return (dispatch, getState) => {
    // check if already fetching to avoid race conditions
    if (getState().devices.isFetching) {
      return Promise.resolve();
    }

    return api.get('/Devices/getMyDevices')
      .then((response) => {
        const devices = response.data.devices;
        dispatch(setDevices(devices));
        dispatch(setIsFetching(false));
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(setIsFetching(false));
        // TODO
      });
  };
};

export const activate = (deviceId) => {
  return (dispatch) => {
    return api.post(`/Devices/${deviceId}/activate`)
      .then((response) => {
        console.log('Device is activated');
      })
  };
};

export const deactivate = (deviceId) => {
  return (dispatch) => {
    return api.post(`/Devices/${deviceId}/deactivate`)
      .then((response) => {
        console.log('Device is deactivated');
      })
  };
};