import React, { Component } from 'react';
import './Shared/styles/App.css';
import Intro from './Layouts/Intro';
import AboutProject from './Layouts/AboutProject';
import MeetMichael from './Layouts/MeetMichael';
import Blog from './Layouts/Blog';
import Map from './Maps';
import {SectionsContainer, Section} from 'react-fullpage';

class App extends Component {

  render() {
    let options = {
      sectionClassName:     'section',
      anchors:              ['intro', 'about', 'meet-michael', 'map', 'blog'],
      scrollBar:            true,
      navigation:           true,
      navigationPosition:   'left',
      normalScrollElements: '.sidepanel, .map-container',
      autoScrolling:        false,
      verticalAlign:        false,
      arrowNavigation:      true,
      scrollingSpeed: 500
    };

    return (
      <SectionsContainer className="App" {...options}>
        <Section data-type="Intro">
          <Intro />
        </Section>
        <Section data-type="About">
          <AboutProject />
        </Section>
        <Section data-type="Meet Michael">
          <MeetMichael />
        </Section>
        <Section data-type="Map">
          <Map />
        </Section>
        <Section data-type="Blog">
          <Blog />
        </Section>
      </SectionsContainer>
    );
  }
}

export default App;
