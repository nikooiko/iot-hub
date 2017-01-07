import api from '../../../utils/api';
import { SET_DEVICES, SET_DEVICE, SET_IS_FETCHING } from './devicesTypes';

export const fetchDevices = () => {
  return (dispatch, getState) => {
    // check if already fetching to avoid race conditions
    if (getState().devices.isFetching) {
      return;
    }

    dispatch({ type: SET_IS_FETCHING, isFetching: true });
    return api.get('/Devices/getMyDevices')
      .then((response) => {
        const devices = response.data.devices;
        dispatch({ type: SET_IS_FETCHING, isFetching: false });
        dispatch({ type: SET_DEVICES, devices });
      });
  };
};

export const setDevice = (device) => {
  return (dispatch) => {
    dispatch({ type: SET_DEVICE, device });
  };
};