import React from 'react';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Intro from './sections/Intro';
import Iot from './sections/Iot';
import Users from './sections/Users';
import Page4 from './sections/Page4';
import Technologies from './sections/Technologies';
import SectionButton from './SectionButton';
import bindFunctions from '../utils/bindFunctions';

// TODO report bug with Auth Menu
// TODO step navigation

class Home extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['_onSectionDown', '_onSectionUp', '_onWheel']);

    this.state = {
      selected: 4,
      slide: 'up'
    };

    this.sections = [
      (
        <Section
          full={true} pad='none' key='intro'
        >
          <Intro/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
      ),
      (
        <Section
          full={true} pad='none' colorIndex='accent-1' key='page-2'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Iot/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
      ),
      (
        <Section
          full={true} pad='none' key='page-3'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Users/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
      ),
      (
        <Section
          full={true} pad='none' colorIndex='brand' key='page-4'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Page4/>
          <SectionButton _onClick={this._onSectionDown} direction='down'/>
        </Section>
      ),
      (
        <Section
          full={true} pad='none' key='technologies'
        >
          <SectionButton _onClick={this._onSectionUp} direction='up'/>
          <Technologies/>
        </Section>
      )
    ];
  }

  _onWheel(event) {
    const deltaY = event.deltaY;
    if (deltaY > 0) { // means Down
      this._onSectionDown();
    } else {
      this._onSectionUp();
    }
  }

  _onSectionUp() {
    const currState = this.state;
    if (currState.selected > 0) { // Up is available
      const selected = currState.selected - 1;
      this.setState({
        ...currState,
        selected,
        slide: 'down'
      });
    }
  }

  _onSectionDown() {
    const currState = this.state;
    if (currState.selected < this.sections.length - 1) { // Down is available
      const selected = currState.selected + 1;
      this.setState({
        ...currState,
        selected,
        slide: 'up'
      });
    }
  }

  // TODO fix scroll and onTouchMove
  render() {
    const selected = this.state.selected;
    const currSection = this.sections[selected];
    const progress = selected / (this.sections.length - 1) * 100;
    return (
      <Article
        colorIndex='light-2' full={true} scrollStep={true}
        onWheel={this._onWheel}
        onTouchMove={this._onWheel}
        onScroll={this.onWheel}
      >
        <div className='progress' style={{width: `${progress}%`}}/>
        {currSection}
      </Article>
    )
  }
}

export default Home;