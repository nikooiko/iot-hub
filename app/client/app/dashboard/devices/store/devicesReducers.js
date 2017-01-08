import { SET_DEVICE, SET_DEVICES, SET_IS_FETCHING} from './devicesTypes';

const INITIAL_STATE = {
  devices: [],
  isFetching: false
};

const findDevice = (newDevice) => {
  return (oldDevice) => {
    return oldDevice.id === newDevice.id;
  }
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_DEVICES:
      return { ...state,
        devices: [...action.devices]
      };
    case SET_DEVICE:
      const newDevice = action.device;
      const newDevices = [...state.devices];
      const oldDeviceIndex = newDevices.findIndex(findDevice(newDevice));
      if ( oldDeviceIndex !== -1 ) {
        // already exists
        newDevices[oldDeviceIndex] = newDevice;
      } else {
        newDevices.push(newDevice);
      }
      return {
        ...state,
        devices: newDevices
      };
    case SET_IS_FETCHING:
      return {...state, isFetching: action.isFetching};
    default:
      return state;
  }
}
