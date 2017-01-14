import React from 'react';
import Tile from 'grommet/components/Tile';

export class SensorTile extends React.Component {
  render() {
    const { sensorId, sensorValue } = this.props;
    return (
      <Tile
        align='center' direction='column' pad='small'
        className='device-data-tile'
      >
        <strong>{sensorId}</strong>
        <span>{sensorValue}</span>
      </Tile>
    );
  }
}

export default SensorTile;
