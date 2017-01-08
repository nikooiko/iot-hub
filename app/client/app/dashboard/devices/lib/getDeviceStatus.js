const status = {
  deactivated: { name: 'deactivated', label: 'Deactivated', value: 'warning' },
  offline: { name: 'offline', label: 'Offline', value: 'disabled' },
  online: { name: 'online', label: 'Online', value: 'ok' },
  unknown: { name: 'unknown', label: 'Unknown', value: 'unknown' }
};

export default (device) => {
  if (!device.activated) {
    return status.deactivated;
  } else if (device.state) {
    return status[device.state.status];
  }
  return status.unknown;
};