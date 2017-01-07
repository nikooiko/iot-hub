import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
import Navbar from '../navigation/Navbar';
import { fetchDevices } from './store/devicesActions';
import Loading from '../../common/Loading';
import bindFunctions from '../../utils/bindFunctions';

export class Devices extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['_onSort']);
    this.state = {
      sort: {
        index: 0,
        ascending: true
      }
    }
  }

  componentDidMount() {
    this.props.fetchDevices();
  }

  _onSort(index, ascending) {
    const newState = {
      ...this.state,
      sort: {
        index,
        ascending
      }
    };
    this.setState(newState);
  }

  renderDevice(device) {
    return (
      <TableRow key={device.id}>
        <td>Status</td>
        <td>{device.id}</td>
        <td>TODO</td>
      </TableRow>
    );
  }

  render() {
    let content;
    if (this.props.devices.isFetching) {
      content = (
        <Loading />
      )
    } else {
      const devices = this.props.devices.devices;
      const sort = this.state.sort;
      content = (
        <Table a11yTitle='Devices List'>
          <TableHeader
            labels={['State', 'Device-ID', 'Actions']}
            sortIndex={sort.index}
            sortAscending={sort.ascending}
            onSort={this._onSort}
          />
          <tbody>
            {devices.map(this.renderDevice)}
          </tbody>
        </Table>
      )
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
