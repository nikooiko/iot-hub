import React from 'react';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Intro from './sections/Intro';
import Iot from './sections/Iot';
import Community from './sections/Community';
import Join from './sections/Join';
import About from './sections/About';
import SectionButton from './SectionButton';
import bindFunctions from '../utils/bindFunctions';
import HomeNav from './HomeNav';

class Home extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this,
      ['_onSelect', '_onSectionUp', '_onSectionDown', '_onSectionSelect']);

    this.state = {
      selected: 0 // TODO 0
    };

    this.sections = ['intro', 'iot', 'community', 'join', 'about'];
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
          full={true} pad='none'
        >
          <div className='progress' style={{width: `${progress}%`}}/>
          <Box full='horizontal'>
            <HomeNav _onSectionSelect={this._onSectionSelect}/>
          </Box>
          <Intro/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
        <Section
          full={true} pad='none' colorIndex='accent-1'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Iot/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
        <Section
          full={true} pad='none'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Community/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
        <Section
          full={true} pad='none' colorIndex='brand'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Join/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
        <Section
          full={true} pad='none'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <About _onSectionSelect={this._onSectionSelect}/>
        </Section>
      </Article>
    )
  }
}

export default Home;