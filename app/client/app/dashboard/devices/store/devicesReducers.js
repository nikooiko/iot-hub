import { SET_DEVICE, SET_DEVICES, SET_IS_FETCHING} from './devicesTypes';

const INITIAL_STATE = {
  devices: [],
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_DEVICES:
      return { ...state,
        devices: action.devices
      };
    case SET_DEVICE:
      const newDevice = action.device;
      const newState = { ...state };
      const devices = newState.devices;
      const deviceIndex = devices.indexOf(newDevice);
      if ( deviceIndex !== -1) {
        // already exists
        devices[deviceIndex] = newDevice;
      } else {
        devices.push(newDevice);
      }
      return newState;
    case SET_IS_FETCHING:
      return {...state, isFetching: action.isFetching}
    default:
      return state;
  }
}
