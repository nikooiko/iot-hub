import React from 'react';
import { connect } from 'react-redux';
import ActionsIcon from 'grommet/components/icons/base/Actions';
import ActivateIcon from 'grommet/components/icons/base/Action';
import DeactivateIcon from 'grommet/components/icons/base/Power';
import TerminalIcon from 'grommet/components/icons/base/Terminal';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import { activate, deactivate } from '../store/devicesActions';
import bindFunctions from '../../../utils/bindFunctions';

const renderAction = (key, icon, label, action) => {
  return (
    <Button
      key={key}
      icon={icon}
      label={label}
      plain={true}
      onClick={action}
    />
  )
};

class DeviceActions extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['_onActivate', '_onDeactivate', '_onTerminal']);
  }

  _onActivate() {
    const { activate, deviceId } = this.props;
    activate(deviceId);
  }

  _onDeactivate() {
    const { deactivate, deviceId } = this.props;
    deactivate(deviceId);
  }

  _onTerminal() {
    console.log(`Unimplemented 'Terminal action`);
  }

  renderActivateAction(key) {
    return renderAction(key, <ActivateIcon />, 'Activate', this._onActivate);
  }

  renderDeactivateAction(key) {
    return renderAction(key, <DeactivateIcon />, 'Deactivate', this._onDeactivate);
  }

  renderTerminalAction(key) {
    return renderAction(key, <TerminalIcon />, 'Terminal', this._onTerminal);
  }

  renderActions(status) {
    let key = -1;

    switch(status.name) {
      case 'deactivated':
        return [
          this.renderActivateAction(++key)
        ];
      case 'online':
        return [
          this.renderDeactivateAction(++key),
          this.renderTerminalAction(++key)
        ];
      case 'offline':
        return [
          this.renderDeactivateAction(++key)
        ];
      default:
        return [];
    }
  };

  render() {
    const { status, mediaType } = this.props;
    let inline = true;
    let colorIndex = 'grey-5';
    if (mediaType === 'palm') {
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
        {this.renderActions(status)}
      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({
  mediaType: state.browser.mediaType
});

export default connect(mapStateToProps, { activate, deactivate })(DeviceActions);
