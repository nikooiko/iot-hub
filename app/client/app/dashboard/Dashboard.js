import React from 'react';
import { connect } from 'react-redux';
import Split from 'grommet/components/Split';
import Article from 'grommet/components/Article';
import Sidebar from './navigation/sidebar/Sidebar';
import { fetchDevices } from './devices/store/devicesActions';
import Loading from '../common/Loading';

class Dashboard extends React.Component {
  constructor(props, content) {
    super(props, content);

    this.state = {
      isReady: false
    }
  }

  componentWillMount() {
    this.props.ownerStream.start();
    this.props.fetchDevices()
      .then(() => {
        this.setState({
          ...this.state,
          isReady: true
        })
      });
  }

  render() {
    const priority = this.props.sidebarOpened ? 'left' : 'right';

    return (
      <Split fixed={true} flex={'right'} priority={priority}>
        <Sidebar/>
        <Article colorIndex='light-1'>
          { this.state.isReady ? this.props.children : <Loading />}
        </Article>
      </Split>
    )
  }
}

const mapStateToProps = (state) => ({
  sidebarOpened: state.sidebar.opened,
  ownerStream: state.devices.ownerStream
});

export default connect(mapStateToProps, { fetchDevices })(Dashboard);
