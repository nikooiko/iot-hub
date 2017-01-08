import React from 'react';
import Notification from 'grommet/components/Notification';
import Status from 'grommet/components/icons/Status';

export class DeviceStatus extends React.Component {
  render() {
    const { status, renderForTile } = this.props;
    if (renderForTile) {
      return (
        <div>
          <Status value={status.value} size="small" />
          <span className='secondary'>{status.label}</span>
        </div>
      )
    }
    // Render status as bar
    return (
      <Notification
        status={status.value}
        message={status.label}
      />
    );
  }
}

export default DeviceStatus;
