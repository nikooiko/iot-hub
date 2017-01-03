import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import MeasureIcon from 'grommet/components/icons/base/Rss';
import CollectIcon from 'grommet/components/icons/base/Database';
import AnalyzeIcon from 'grommet/components/icons/base/LineChart';

class Join extends React.Component {
  render() {
    return (
      <Box flex={true} responsive={false}>
        <Box
          direction='row' flex={true} justify='center' pad={{horizontal: 'medium', between:'large'}}
          responsive={false}
        >
          <Box justify='center'>
            <MeasureIcon colorIndex='grey-1' size='xlarge'/>
          </Box>
          <Box align='center' justify='center'>
            <Heading strong={true} tag='h3' truncate={true} margin='none'>Measure</Heading>
            <Paragraph>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Paragraph>
          </Box>
        </Box>
        <Box
          direction='row' flex={true} justify='center' pad={{horizontal: 'medium', between:'large'}}
          responsive={false}
        >
          <Box align='center' justify='center'>
            <Heading strong={true} tag='h3' truncate={true} margin='none'>Collect</Heading>
            <Paragraph >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Paragraph>
          </Box>
          <Box justify='center'>
            <CollectIcon colorIndex='grey-1' size='xlarge'/>
          </Box>
        </Box>
        <Box
          direction='row' flex={true} justify='center' pad={{horizontal: 'medium', between:'large'}}
          responsive={false}
        >
          <Box justify='center'>
            <AnalyzeIcon colorIndex='grey-1' size='xlarge'/>
          </Box>
          <Box align='center' justify='center'>
            <Heading strong={true} tag='h3' truncate={true} margin='none'>Analyze</Heading>
            <Paragraph>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Paragraph>
          </Box>
        </Box>
      </Box>
    )
  }
}
export default Join;