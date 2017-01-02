import React from 'react';
import Image from 'grommet/components/Image';

const imgUrl = '/static/IotHub-logo.png';

class HomeLogo extends React.Component {
  render() {
    return (
      <Image src={imgUrl} alt='IotHub' full='horizontal'/>
    )
  }
}

export default HomeLogo;
