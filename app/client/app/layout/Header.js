import React from 'react';
import Navbar from '../navigation/navbar/Navbar';
import Sidebar from '../navigation/sidebar/Siderbar';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar/>
      </div>
    )
  }
}

export default Header;
