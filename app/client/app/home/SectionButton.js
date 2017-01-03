import React from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import UpIcon from 'grommet/components/icons/base/Up';
import DownIcon from 'grommet/components/icons/base/Down';

class SectionButton extends React.Component {
  constructor(props, content) {
    super(props, content);
    if (props.direction === 'up') {
      this.icon = <UpIcon/>;
    } else {
      this.icon = <DownIcon/>;
      this.label = 'scroll down to continue';
    }
  }

  render() {
    return (
      <Box onClick={this.props._onClick}>
        {this.label}
        <Button
          plain={true}
          onClick={() => {}}
          icon={this.icon}
        />
      </Box>
    )
  }
}
export default SectionButton;