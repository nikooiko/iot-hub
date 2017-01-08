import React from 'react';
import Tile from 'grommet/components/Tile';

export class SensorTile extends React.Component {
  render() {
    const { sensor } = this.props;
    return (
      <Tile
        align='center' direction='column' pad='small'
        className='device-data-tile'
      >
        <strong>{sensor.id}</strong>
        <span>{sensor.value}</span>
      </Tile>
    );
  }
}

export default SensorTile;
