import React from 'react';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui';
import OpenIcon from 'material-ui/svg-icons/editor/drag-handle'
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { openSidebar, closeSidebar } from './sidebarActions';

class Sidebar extends React.Component {
  render() {
    if (this.props.authenticated) {
      if (this.props.opened) {
        return (
          <IconButton onTouchTap={() => this.props.closeSidebar()}>
            <CloseIcon/>
          </IconButton>
        );
      }
      return (
        <IconButton onTouchTap={() => this.props.openSidebar()}>
          <OpenIcon/>
        </IconButton>
      )
    }
    return null;
  }
}

const mapStateToProps = (state) => ({
  opened: state.sidebar.opened,
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { openSidebar, closeSidebar })(Sidebar);
