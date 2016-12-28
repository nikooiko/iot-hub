import React from 'react';
import { connect } from 'react-redux';
import { routeAfterAuth } from './authConfig';

export default (ComposedComponent) => {
  class Unauthenticated extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      if(this.props.authenticated) {
        this.context.router.push(routeAfterAuth);
      }
    }

    componentWillUpdate(nextProps) {
      if(nextProps.authenticated) {
        this.context.router.push(routeAfterAuth);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Unauthenticated);
}
