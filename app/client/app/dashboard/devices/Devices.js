import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import DeviceTile from './DeviceTile';
import Navbar from '../navigation/Navbar';
import { fetchDevices } from './store/devicesActions';
import Loading from '../../common/Loading';

export class Devices extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.state = {
      isReady: false
    }
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
      content = (
        <Tiles flush={false} fill={false}>
          {devices.map((device) => this.renderDevice(device))}
        </Tiles>
      );
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
