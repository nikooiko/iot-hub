import React from 'react';
import Header from './Header';
import Footer from './Footer';

class Container extends React.Component {
  render() {
    return (
      <div className='container'>
        <Header/>
        <div className='content'>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Container;
