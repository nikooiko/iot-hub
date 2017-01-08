import React from 'react';
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux';
import Tile from 'grommet/components/Tile';
import DeviceStatus from './device/DeviceStatus';
import getDeviceStatus from './lib/getDeviceStatus';
import { closeSidebar } from '../navigation/sidebar/store/sidebarActions';

export class DeviceTile extends React.Component {
  _onClick(deviceId) {
    return () => {
      if (this.props.sidebarOpened) {
        this.props.closeSidebar();
      }
      this.props.push(`/devices/${deviceId}`);
    };
  }

  render() {
    const { device } = this.props;
    const deviceLabel = device.id;
    const status=getDeviceStatus(device);
    return (
      <Tile
        align='center' direction='column' pad='small' a11yTitle={`View ${deviceLabel} Device`}
        onClick={this._onClick(device.id)}
        className='device-tile'
      >
        <strong>{deviceLabel}</strong>
        <DeviceStatus status={status} renderForTile={true} />
      </Tile>
    );
  }
}

const mapStateToProps = (state) => ({
  sidebarOpened: state.sidebar.opened,
});

export default connect(mapStateToProps, { closeSidebar, push: routerActions.push })(DeviceTile);
