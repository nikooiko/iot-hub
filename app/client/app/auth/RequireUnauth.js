import React from 'react';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class Anauthenticated extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      if(this.props.authenticated) {
        this.context.router.push('/dashboard');
      }
    }

    componentWillUpdate(nextProps) {
      if(nextProps.authenticated) {
        this.context.router.push('/dashboard');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Anauthenticated);
}
