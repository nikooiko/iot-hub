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
import Anchor from 'grommet/components/Anchor';
import GitHubIcon from 'grommet/components/icons/base/SocialGithub';
import InfoIcon from 'grommet/components/icons/base/CircleInformation';

const grommetLogo = '/static/technologies/grommet-logo.png';
const lbLogo = '/static/technologies/lb-logo.png';
const mongodbLogo = '/static/technologies/mongodb-logo.png';
const reduxLogo = '/static/technologies/redux-logo.png';
const reactLogo = '/static/technologies/react-logo.png';
const nodejsLogo = '/static/technologies/nodejs-logo.png';

class About extends React.Component {
  render() {
    let name = 'Nick Oikonomou';
    let imgSize = 'small';
    let headlineSize = 'medium';
    // Calculate Responsive values
    const mediaType = this.props.mediaType;
    if (mediaType === 'palm') {
      name = '';
      headlineSize = 'small';
      imgSize = 'thumb';
    }

    return (
      <Box flex={true} responsive={false} justify='between'>
        <Box justify='center' align='center' flex={true}>
          <Headline strong={true} size={headlineSize}>
            Technologies Used
          </Headline>
          <Tiles
            flush={true} size='small' justify='center' responsive={false}
          >
            <Tile pad='small'>
              <Anchor href='https://facebook.github.io/react/' target='_blank'>
                <Image src={reactLogo} alt='React' size={imgSize} className='technology-logo'/>
              </Anchor>
            </Tile>
            <Tile pad='small'>
              <Anchor href='https://grommet.github.io/' target='_blank'>
                <Image src={grommetLogo} alt='Grommet' size={imgSize} className='technology-logo'/>
              </Anchor>
            </Tile>
            <Tile pad='small'>
              <Anchor href='https://loopback.io/' target='_blank'>
                <Image src={lbLogo} alt='Loopback' size={imgSize} className='technology-logo'/>
              </Anchor>
            </Tile>
            <Tile pad='small'>
              <Anchor href='https://www.mongodb.com/' target='_blank'>
                <Image src={mongodbLogo} alt='MongoDB' size={imgSize} className='technology-logo'/>
              </Anchor>
            </Tile>
            <Tile pad='small'>
              <Anchor href='http://redux.js.org/' target='_blank'>
                <Image src={reduxLogo} alt='Redux' size={imgSize} className='technology-logo'/>
              </Anchor>
            </Tile>
            <Tile pad='small'>
              <Anchor href='https://nodejs.org/en/' target='_blank'>
                <Image src={nodejsLogo} alt='NodeJS' size={imgSize} className='technology-logo'/>
              </Anchor>
            </Tile>
          </Tiles>
          <Box direction='row' pad='large'>
            <Button
              path='/aboutUs' label='About Us' icon={<InfoIcon />}
            />
          </Box>
        </Box>
        <Footer
          primary={true} colorIndex='neutral-1' pad={{horizontal:'medium', vertical:'small'}}
        >
          <Anchor
            href="https://github.com/nikooiko/iot-hub" icon={<GitHubIcon />} target='_blank'
            animateIcon={true}
          />
          <Box flex={true} direction='row' justify='center'>
            <Paragraph margin='none' align='center'>
              {name} © 2016
            </Paragraph>
          </Box>
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