import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import MeasureIcon from 'grommet/components/icons/base/Rss';
import CollectIcon from 'grommet/components/icons/base/Database';
import AnalyzeIcon from 'grommet/components/icons/base/LineChart';

class Iot extends React.Component {
  render() {
    const paragraphClasses = '';
    const headingSize='h3';

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
            <Heading strong={true} tag={headingSize} margin='none'>Measure</Heading>
            <Paragraph className={paragraphClasses} margin='none'>
              Measure and monitor your environment
            </Paragraph>
          </Box>
        </Box>
        <Box
          direction='row' flex={true} justify='center' pad={{horizontal: 'medium', between:'large'}}
          responsive={false}
        >
          <Box align='center' justify='center'>
            <Heading strong={true} tag={headingSize} margin='none'>Collect</Heading>
            <Paragraph className={paragraphClasses} margin='none'>
              Collect and store data for later use
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
            <Heading strong={true} tag={headingSize} margin='none'>Analyze</Heading>
            <Paragraph className={paragraphClasses} margin='none'>
              Process and provide useful analytics
            </Paragraph>
          </Box>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  browser: state.browser
});

export default connect(mapStateToProps)(Iot);