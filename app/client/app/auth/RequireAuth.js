import React from 'react';
import { connect } from 'react-redux';
import { routeAfterUnauth } from './authConfig';

export default (ComposedComponent) => {
  class Authenticated extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push(routeAfterUnauth);
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.push(routeAfterUnauth);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStateToProps)(Authenticated);
}
