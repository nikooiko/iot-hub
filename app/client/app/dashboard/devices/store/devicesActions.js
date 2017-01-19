import api from '../../../utils/api';
import { SET_DEVICES, SET_DEVICE, UPDATE_DEVICE, SET_IS_FETCHING } from './devicesTypes';
import msgTypes from '../../../../../server/lib/msgTypes';
const ownersMsgTypes = msgTypes.ownersMsgTypes;

// Sync Action Creators
export const setIsFetching = (isFetching) => {
  return { type: SET_IS_FETCHING, isFetching };
};

export const setDevice = (device) => {
  return { type: SET_DEVICE, device };
};

export const updateDevice = (deviceId, newValues) => {
  return { type: UPDATE_DEVICE, deviceId, newValues };
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
  return (dispatch, getState) => {
    // TODO Warning: fix race conditions ?
    const message = {
      type: ownersMsgTypes.updateDevice,
      deviceId,
      data: {
        activated: true
      }
    };
    getState().devices.ownerStream.sendMessageToIotHub(message);
  };
};

export const deactivate = (deviceId) => {
  return (dispatch, getState) => {
    const message = {
      type: ownersMsgTypes.updateDevice,
      deviceId,
      data: {
        activated: false
      }
    };
    getState().devices.ownerStream.sendMessageToIotHub(message);
  };
};