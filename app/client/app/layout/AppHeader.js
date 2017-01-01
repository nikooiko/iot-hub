import React from 'react';
import Navbar from '../navigation/Navbar';

class AppHeader extends React.Component {
  render() {
    return (
      <Navbar page={this.props.page}/>
    )
  }
}

export default AppHeader;
