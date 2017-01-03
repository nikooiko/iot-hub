import React from 'react';
import { connect } from 'react-redux';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import TopIcon from 'grommet/components/icons/base/Up';

import Logo from '../../common/Logo';

const grommetLogo = '/static/technologies/grommet-logo.png';
const lbLogo = '/static/technologies/lb-logo.png';
const mongodbLogo = '/static/technologies/mongodb-logo.png';
const reduxLogo = '/static/technologies/redux-logo.png';
const reactLogo = '/static/technologies/react-logo.png';
const nodejsLogo = '/static/technologies/nodejs-logo.png';

class About extends React.Component {
  render() {
    const imgSize = this.props.mediaType === 'palm' ? 'thumb' : 'small';

    return (
      <Box flex={true} responsive={false} justify='between'>
        <Box>
          <Headline strong={true}>
            Technologies Used
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
        <Footer
          primary={true} colorIndex='neutral-1' pad={{horizontal:'medium', vertical:'small'}} justify='between'
        >
          <Logo color='white'/>
          <Paragraph margin='none'>
            © 2016
          </Paragraph>
          <Button
            label='TOP' plain={true} icon={<TopIcon/>}
            onClick={() => this.props._onSectionSelect('intro')}
          />
        </Footer>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  mediaType: state.browser.mediaType
});

export default connect(mapStateToProps)(About);