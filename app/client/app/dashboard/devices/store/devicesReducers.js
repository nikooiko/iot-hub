import { UPDATE_DEVICE, SET_DEVICE, SET_DEVICES, SET_IS_FETCHING }
  from './devicesTypes';
import OwnerStream from '../lib/OwnerStream';

const ownerStream = new OwnerStream();

const INITIAL_STATE = {
  devices: [],
  devicesCount: {
    all: 0,
    deactivated: 0,
    online: 0,
    offline: 0
  },
  isFetching: false,
  ownerStream
};

const findDevice = (deviceId) => {
  return (oldDevice) => {
    return oldDevice.id === deviceId;
  }
};

const calculateDevicesCount = (devices) => {
  const devicesCount = {
    all: 0,
    deactivated: 0,
    online: 0,
    offline: 0
  };
  let i = -1;
  const len = devices.length - 1;
  while (i++ < len) {
    const device = devices[i];
    incrDevicesCount(devicesCount, device);
  }
  return devicesCount;
};

const incrDevicesCount = (devicesCount, device) => {
  devicesCount.all++;
  if (!device.activated) {
    devicesCount.deactivated++;
  } else if (device.status === 'online') {
    devicesCount.online++;
  } else if (device.status === 'offline') {
    devicesCount.offline++;
  }
};

const decrDevicesCount = (devicesCount, device) => {
  devicesCount.all--;
  if (!device.activated) {
    devicesCount.deactivated--;
  } else if (device.status === 'online') {
    devicesCount.online--;
  } else if (device.status === 'offline') {
    devicesCount.offline--;
  }
};

export default (state = INITIAL_STATE, action) => {
  let deviceId;
  let newDevices;
  let newDevice;
  let oldDeviceIndex;
  let newDevicesCount;
  switch(action.type) {
    case SET_DEVICES:
      newDevices = action.devices;
      return { ...state,
        devices: newDevices,
        devicesCount: calculateDevicesCount(newDevices)
      };
    case SET_DEVICE:
      newDevicesCount = { ...state.devicesCount };
      newDevice = action.device;
      newDevices = [...state.devices];
      oldDeviceIndex = newDevices.findIndex(findDevice(newDevice.id));
      if ( oldDeviceIndex !== -1 ) {
        // already exists
        decrDevicesCount(newDevicesCount, newDevices[oldDeviceIndex]);
        newDevices[oldDeviceIndex] = newDevice;
        incrDevicesCount(newDevicesCount, newDevice);
      } else {
        newDevices.push(newDevice);
        incrDevicesCount(newDevicesCount, newDevice);
      }
      return {
        ...state,
        devices: newDevices,
        devicesCount: newDevicesCount
      };
    case UPDATE_DEVICE:
      newDevicesCount = { ...state.devicesCount };
      deviceId = action.deviceId;
      newDevices = [...state.devices];
      oldDeviceIndex = newDevices.findIndex(findDevice(deviceId));
      if ( oldDeviceIndex !== -1 ) {
        // already exists
        decrDevicesCount(newDevicesCount, newDevices[oldDeviceIndex]);
        newDevice = {
          ...newDevices[oldDeviceIndex],
          ...action.newValues
        };
        newDevices[oldDeviceIndex] = newDevice;
        incrDevicesCount(newDevicesCount, newDevice);
      }
      return {
        ...state,
        devices: newDevices,
        devicesCount: newDevicesCount
      };
    case SET_IS_FETCHING:
      return {...state, isFetching: action.isFetching };
    default:
      return state;
  }
}
