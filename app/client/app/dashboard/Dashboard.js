import React from 'react';
import { connect } from 'react-redux';
import Split from 'grommet/components/Split';
import Article from 'grommet/components/Article';
import Sidebar from './navigation/sidebar/Sidebar';
import { fetchDevices } from './devices/store/devicesActions';
import OwnerStream from './devices/lib/OwnerStream';
import Loading from '../common/Loading';

class Dashboard extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.ownerStream = new OwnerStream();
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
        })
      });
  }

  componentWillUnmount() {
    this.ownerStream.destroy();
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
  sidebarOpened: state.sidebar.opened
});

export default connect(mapStateToProps, { fetchDevices })(Dashboard);
