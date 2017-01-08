import React from 'react';
import { connect } from 'react-redux';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Value from 'grommet/components/Value';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import AllIcon from 'grommet/components/icons/base/Robot';
import Status from 'grommet/components/icons/Status';

import Navbar from './navigation/Navbar';
import { status } from './devices/lib/getDeviceStatus';

export class Dashboard extends React.Component {
  render() {
    const { mediaType } = this.props;
    let valueSize = 'large';
    let iconSize = 'large';
    if (mediaType === 'palm') {
      valueSize = 'medium';
    }
    return (
      <Box>
        <Navbar page='Dashboard'/>
        <Box margin={{top: 'small', horizontal: 'small'}} pad='none'>
          <Box
            direction='row' flex={true} justify='between'
            pad={{between:'small'}}
          >
            <Box
              direction='row' responsive={false} justify='between' flex={true}
              pad={{between:'small'}}
            >
              <Box
                align='center' direction='column' pad='small'
                colorIndex='grey-5' flex={true}
              >
                <Value
                  icon={<AllIcon size={iconSize} />}
                  label='All Devices' value={100} size={valueSize}
                />
              </Box>
              <Box
                align='center' direction='column' pad='small'
                colorIndex={ status.online.colorIndex } flex={true}
              >
                <Value
                  icon={<Status value={ status.online.value } size={iconSize} />}
                  label='Online' value={100} size={valueSize}
                />
              </Box>
            </Box>
            <Box
              direction='row' responsive={false} justify='between' flex={true}
              pad={{between:'small'}}
            >
              <Box
                align='center' direction='column' pad='small'
                colorIndex={ status.offline.colorIndex } flex={true}
              >
                <Value
                  icon={<Status value={ status.offline.value } size={iconSize} />}
                  label='Offline' value={100} size={valueSize}
                />
              </Box>
              <Box
                align='center' direction='column' pad='small'
                colorIndex={ status.deactivated.colorIndex } flex={true}
              >
                <Value
                  icon={<Status value={ status.deactivated.value } size={iconSize} />}
                  label='Deactivated' value={100} size={valueSize}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box margin={{top: 'small', horizontal: 'small'}} pad='none' colorIndex='light-2'>
          <Accordion openMulti={true} animate={false}>
            <AccordionPanel heading='User Information' pad='small'>
              <Box>
                User Info
              </Box>
            </AccordionPanel>
            <AccordionPanel heading='Shortcuts and Actions' pad='small'>
              <Box>
                Shortcuts && Actions
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  mediaType: state.browser.mediaType
});

export default connect(mapStateToProps)(Dashboard);
