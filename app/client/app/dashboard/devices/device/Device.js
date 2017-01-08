import React from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import DeviceTile from '../DeviceTile';
import DeviceNavbar from '../deviceNavigation/DeviceNavbar';

export class Device extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.state = {
      device: null
    }
  }

  componentWillMount() {
    const { devices, deviceId, replace }= this.props;
    const findDevice = (device) => {
      return device.id === deviceId;
    };
    const device = devices.find(findDevice);
    if (!device) {
      replace('/devices');
      return;
    }
    this.setState({
      ...this.state,
      device
    })
  }

  render() {
    const device = this.state.device;
    return (
      <Box flex={true}>
        <DeviceNavbar/>
        <Box>
          {device ? device.id : 'Not Exist'}
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