export const status = {
  deactivated: { name: 'deactivated', label: 'Deactivated', value: 'warning', colorIndex: 'warning' },
  offline: { name: 'offline', label: 'Offline', value: 'disabled', colorIndex: 'unknown' },
  online: { name: 'online', label: 'Online', value: 'ok', colorIndex: 'ok' },
  unknown: { name: 'unknown', label: 'Unknown', value: 'unknown', colorIndex: 'grey-5' }
};

export default (device) => {
  if (!device.activated) {
    return status.deactivated;
  } else if (device.state) {
    return status[device.state.status];
  }
  return status.unknown;
};