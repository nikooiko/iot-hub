import React from 'react';
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux';
import Tile from 'grommet/components/Tile';
import Status from 'grommet/components/icons/Status';
import states from './deviceState';
import { closeSidebar } from '../navigation/sidebar/store/sidebarActions';

export class DeviceTile extends React.Component {
  constructor(props, content) {
    super(props, content);
  }

  _onClick(deviceId) {
    return () => {
      this.props.closeSidebar();
      this.props.push(`/devices/${deviceId}`);
    };
  }

  render() {
    const device = this.props.device;
    const deviceLabel = device.id;
    let state = states.unknown;
    if (!device.activated) {
      state = states.deactivated;
    } else {
      if (device.state) {
        state = states[device.state.status];
      }
    }
    return (
      <Tile
        align='center' direction='column' pad='small' a11yTitle={`View ${deviceLabel} Device`}
        onClick={this._onClick(device.id)}
        className='device-tile'
      >
        <strong>{deviceLabel}</strong>
        <div>
          <Status value={state.icon} size="small" />
          <span className="secondary">{state.name}</span>
        </div>
      </Tile>
    );
  }
}

const mapStateToProps = () => ({

});

export default connect(mapStateToProps, { closeSidebar, push: routerActions.push })(DeviceTile);
