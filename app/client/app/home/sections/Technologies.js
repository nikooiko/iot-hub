import React from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Columns from 'grommet/components/Columns';
import Headline from 'grommet/components/Headline';

const grommetLogo = '/static/technologies/grommet-logo.png';
const lbLogo = '/static/technologies/lb-logo.png';
const mongodbLogo = '/static/technologies/mongodb-logo.png';
const reduxLogo = '/static/technologies/redux-logo.png';
const reactLogo = '/static/technologies/react-logo.png';
const nodejsLogo = '/static/technologies/nodejs-logo.png';

class Technologies extends React.Component {
  render() {
    return (
      <Box basis='full' justify='center' className='blue-border'>
        <Headline strong={true}>
          Technologies
        </Headline>
        <Columns
          maxCount={1}
          size='small' justify='center' className='red-border' responsive={false}
        >
          <Box margin='medium' align='center' className='circle-border' pad='medium'>
            <Image src={reactLogo} alt='React' size='small'/>
          </Box>
          <Box margin='medium' align='center'  className='circle-border' pad='medium'>
            <Image src={grommetLogo} alt='Grommet' size='small'/>
          </Box>
          <Box margin='medium' align='center'  className='circle-border' pad='medium'>
            <Image src={lbLogo} alt='Loopback' size='small'/>
          </Box>
          <Box margin='medium' align='center'  className='circle-border' pad='medium'>
            <Image src={mongodbLogo} alt='MongoDB' size='small'/>
          </Box>
          <Box margin='medium' align='center'  className='circle-border' pad='medium'>
            <Image src={reduxLogo} alt='Redux' size='small'/>
          </Box>
          <Box margin='medium' align='center'  className='circle-border' pad='medium'>
            <Image src={nodejsLogo} alt='NodeJS' size='small'/>
          </Box>
        </Columns>
      </Box>
    )
  }
}
export default Technologies;