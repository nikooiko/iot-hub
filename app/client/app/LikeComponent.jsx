import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';


class LikeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {likesCount : parseInt(props.prevLikes || 0)};
    this.onLike = this.onLike.bind(this);
    if (props.callback) props.callback();
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

  render() {
    return (
      <div>
        Likes : <span>{this.state.likesCount}</span>
        <div>
          <RaisedButton
            label="Like"
            primary={true}
            onTouchTap={() => this.onLike()}
            icon={<ActionThumbUp />}
          />
        </div>
      </div>
    );
  }

}

export default LikeComponent;