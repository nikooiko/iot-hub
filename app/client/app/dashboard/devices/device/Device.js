import React from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import SensorTile from './SensorTile';
import DeviceStatusBar from './DeviceStatus';
import getDeviceStatus from '../lib/getDeviceStatus';
import DeviceNavbar from '../deviceNavigation/DeviceNavbar';

export class Device extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.state = {
      deviceIndex: -1,
    }
  }

  findInDevices() {
    const { devices, deviceId, replace } = this.props;
    const findDevice = (device) => {
      return device.id === deviceId;
    };
    const deviceIndex = devices.findIndex(findDevice);
    if (deviceIndex === -1) {
      replace('/devices');
      return;
    }
    this.setState({
      ...this.state,
      deviceIndex
    });
  }

  componentWillMount() {
    this.findInDevices();
  }

  componentWillUpdate() {
    const { devices, deviceId } = this.props;
    const { deviceIndex } = this.state;
    let device = devices[deviceIndex];
    if (!device || device.id !== deviceId) {
      // device not found or it's not the expected one
      this.findInDevices();
    }
  }

  renderData(sensors) {
    const sensorTiles = [];
    let i = -1;
    const len = sensors.length - 1;
    while ( i++ < len ) {
      const sensor = sensors[i];
      sensorTiles.push(
        <SensorTile
          key={i}
          sensor={sensor}
        />
      );
    }
    return sensorTiles;
  }

  render() {
    const { devices } = this.props;
    const { deviceIndex } = this.state;
    let device = devices[deviceIndex];
    const status = getDeviceStatus(device);

    // Render data if needed
    let dataTiles;
    const data = device.lastData;
    if (data && status.name === 'online') {
      dataTiles = (
        <Tiles flush={false} fill={false}>
          {this.renderData(data)}
        </Tiles>
      )
    }
    return (
      <Box flex={true}>
        <DeviceNavbar status={status} deviceId={device.id}/>
        <Box>
          <DeviceStatusBar status={status}/>
          {dataTiles}
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  deviceId: ownProps.params.deviceId,
  devices: state.devices.devices
});

export default connect(mapStateToProps, { replace: routerActions.replace })(Device);