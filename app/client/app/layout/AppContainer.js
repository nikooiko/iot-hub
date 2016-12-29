import React from 'react';
import { connect } from 'react-redux';
import Split from 'grommet/components/Split';
import Article from 'grommet/components/Article';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppSidebar from '../navigation/sidebar/AppSidebar';


class AppContainer extends React.Component {
  render() {
    const priority = this.props.sidebarOpened ? 'left' : 'right';

    return (
      <Split fixed={true} flex={'right'} priority={priority}>
        <AppSidebar/>
        <Article>
          <AppHeader/>
          { this.props.children }
          <AppFooter/>
        </Article>
      </Split>
    )
  }
}

const mapStateToProps = (state) => ({
  sidebarOpened: state.sidebar.opened
});

export default connect(mapStateToProps)(AppContainer);
