import React from 'react';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Intro from './sections/Intro';
import Iot from './sections/Iot';
import Users from './sections/Users';
import Page4 from './sections/Page4';
import Technologies from './sections/Technologies';
import SectionButton from './SectionButton';
import bindFunctions from '../utils/bindFunctions';
import HomeNav from './HomeNav';

// TODO report bug with Auth Menu
// TODO step navigation

class Home extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this,
      ['_onSelect', '_onSectionUp', '_onSectionDown', '_onSectionSelect']);

    this.state = {
      selected: 0
    };

    this.sections = ['intro', 'iot', 'users', 'page-4', 'technologies'];
  }

  _onSelect(selected) {
    this.setState({
      ...this.state,
      selected
    });
  }

  _onSectionUp() {
    const currState = this.state;
    if (currState.selected > 0) { // Up is available
      const selected = currState.selected - 1;
      this.setState({
        ...currState,
        selected
      });
    }
  }

  _onSectionSelect(sectionName) {
    const selected = this.sections.indexOf(sectionName);
    if (selected !== -1) {
      this.setState({
        ...this.state,
        selected
      });
    }
  }

  _onSectionDown() {
    const currState = this.state;
    if (currState.selected < this.sections.length - 1) { // Down is available
      const selected = currState.selected + 1;
      this.setState({
        ...currState,
        selected
      });
    }
  }

  render() {
    const selected = this.state.selected;
    const progress = selected / (this.sections.length - 1) * 100;
    return (
      <Article
        style={{overflow:'hidden'}} colorIndex='light-2'
        selected={selected} scrollStep={true} onSelect={this._onSelect}
      >
        <Section
          full={true} pad='none' key='intro'
        >
          <div className='progress' style={{width: `${progress}%`}}/>
          <Box full='horizontal'>
            <HomeNav _onSectionSelect={this._onSectionSelect}/>
          </Box>
          <Intro/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
        <Section
          full={true} pad='none' colorIndex='accent-1' key='page-2'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Iot/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
        <Section
          full={true} pad='none' key='users'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Users/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
        <Section
          full={true} pad='none' colorIndex='brand' key='page-4'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Page4/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
        <Section
          full={true} pad='none' key='technologies'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Technologies/>
        </Section>
      </Article>
    )
  }
}

export default Home;