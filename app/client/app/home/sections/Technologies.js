import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Headline from 'grommet/components/Headline';

const grommetLogo = '/static/technologies/grommet-logo.png';
const lbLogo = '/static/technologies/lb-logo.png';
const mongodbLogo = '/static/technologies/mongodb-logo.png';
const reduxLogo = '/static/technologies/redux-logo.png';
const reactLogo = '/static/technologies/react-logo.png';
const nodejsLogo = '/static/technologies/nodejs-logo.png';

class Technologies extends React.Component {
  render() {
    const imgSize = this.props.mediaType === 'palm' ? 'thumb' : 'small';

    return (
      <Box basis='full' justify='center'>
        <Headline strong={true}>
          Technologies
        </Headline>
        <Tiles
          flush={true} size='small' justify='center' responsive={false}
        >
          <Tile pad='small'>
            <Image src={reactLogo} alt='React' size={imgSize} className='technology-logo'/>
          </Tile>
          <Tile pad='small'>
            <Image src={grommetLogo} alt='Grommet' size={imgSize} className='technology-logo'/>
          </Tile>
          <Tile pad='small'>
            <Image src={lbLogo} alt='Loopback' size={imgSize} className='technology-logo'/>
          </Tile>
          <Tile pad='small'>
            <Image src={mongodbLogo} alt='MongoDB' size={imgSize} className='technology-logo'/>
          </Tile>
          <Tile pad='small'>
            <Image src={reduxLogo} alt='Redux' size={imgSize} className='technology-logo'/>
          </Tile>
          <Tile pad='small'>
            <Image src={nodejsLogo} alt='NodeJS' size={imgSize} className='technology-logo'/>
          </Tile>
        </Tiles>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  mediaType: state.browser.mediaType
});

export default connect(mapStateToProps)(Technologies);