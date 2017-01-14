import { UPDATE_DEVICE, SET_DEVICE, SET_DEVICES, SET_IS_FETCHING} from './devicesTypes';

const INITIAL_STATE = {
  devices: [],
  isFetching: false
};

const findDevice = (deviceId) => {
  return (oldDevice) => {
    return oldDevice.id === deviceId;
  }
};

export default (state = INITIAL_STATE, action) => {
  let deviceId;
  let newDevices;
  let newDevice;
  let oldDeviceIndex;
  switch(action.type) {
    case SET_DEVICES:
      return { ...state,
        devices: [...action.devices]
      };
    case SET_DEVICE:
      newDevice = action.device;
      newDevices = [...state.devices];
      oldDeviceIndex = newDevices.findIndex(findDevice(newDevice.id));
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
    case UPDATE_DEVICE:
      deviceId = action.deviceId;
      newDevices = [...state.devices];
      oldDeviceIndex = newDevices.findIndex(findDevice(deviceId));
      if ( oldDeviceIndex !== -1 ) {
        // already exists
        newDevice = {
          ...newDevices[oldDeviceIndex],
          ...action.newValues
        };
        newDevices[oldDeviceIndex] = newDevice;
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
