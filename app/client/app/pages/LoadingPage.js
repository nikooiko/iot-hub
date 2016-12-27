import React from 'react';
import { CircularProgress } from 'material-ui';

class LoadingPage extends React.Component {
  render() {
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }
}
export default LoadingPage;