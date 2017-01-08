import React from 'react';
import ActionsIcon from 'grommet/components/icons/base/Actions';
import ActionIcon from 'grommet/components/icons/base/Action';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import { connect } from 'react-redux';

class DeviceActions extends React.Component {
  render() {
    let inline = true;
    let colorIndex = 'grey-5';
    if (this.props.mediaType === 'palm') {
      inline = false;
      colorIndex = 'grey-4';
    }
    return (
      <Menu
        direction='row'
        icon={<ActionsIcon/>}
        dropAlign={{ right: 'right' }}
        colorIndex={colorIndex} inline={inline}
      >
        <Button
          icon={<ActionIcon />}
          label='Action'
          plain={true}
          onClick={() => {}}
        />
        <Button
          icon={<ActionIcon />}
          label='Action'
          plain={true}
          onClick={() => {}}
        />
      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({
  mediaType: state.browser.mediaType
});

export default connect(mapStateToProps)(DeviceActions);
