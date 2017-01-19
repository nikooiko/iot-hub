'use strict';

const ownersMsgTypes = {
  updateDevice: 'UPDATE_DEVICE'
};

const iotHubMsgTypes = {
  newDevice: 'NEW_DEVICE',
  devStatusChange: 'DEVICE_STATUS_CHANGE',
  devData: 'DEVICE_DATA'
};

module.exports = {
  ownersMsgTypes,
  iotHubMsgTypes
};
