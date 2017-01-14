import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';
import Tiles from 'grommet/components/Tiles';
import DeviceTile from './DeviceTile';
import Navbar from '../navigation/Navbar';
import { fetchDevices } from './store/devicesActions';
import Loading from '../../common/Loading';
import OwnerStream from './lib/OwnerStream';

export class Devices extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.state = {
      isReady: false
    };
    this.ownerStream = new OwnerStream();
  }

  componentWillMount() {
    this.props.fetchDevices()
      .then(() => {
        this.setState({
          ...this.state,
          isReady: true
        });
      });
  }

  componentWillUnmount() {
    this.ownerStream.destroy();
  }

  renderDevice(device) {
    return (
      <DeviceTile
        key={device.id}
        device={device}
      />
    );
  }

  render() {
    let content;
    if (!this.state.isReady || this.props.devices.isFetching) {
      content = <Loading />;
    } else if (this.props.children) {
      return this.props.children;
    } else {
      const devices = this.props.devices.devices;
      if (devices.length > 0) {
        content = (
          <Tiles flush={false} fill={false}>
            {devices.map((device) => this.renderDevice(device))}
          </Tiles>
        );
      } else {
        content = (
          <Notification status='warning' message='Currently you have no devices' />
        )
      }
    }
    return (
      <Box flex={true}>
        <Navbar page='Devices'/>
        {content}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  devices: state.devices
});

export default connect(mapStateToProps, { fetchDevices })(Devices);
