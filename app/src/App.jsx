import React, { Component } from 'react';
import './Shared/styles/App.css';
import Intro from './Layouts/Intro';
import AboutProject from './Layouts/AboutProject';
import MeetMichael from './Layouts/MeetMichael';
import Blog from './Layouts/Blog';
import Map from './Maps';
import axios from 'axios';
import {SectionsContainer, Section} from 'react-fullpage';

class App extends Component {
  state = {
    slaves: [],
  }
  componentDidMount() {

  }
  
  render() {
    let options = {
      sectionClassName:     'section',
      anchors:              ['intro', 'about', 'meet-michael', 'blog'],
      scrollBar:            false,
      navigation:           true,
      verticalAlign:        false,
      arrowNavigation:      true,
      scrollingSpeed: 200
    };

    return (
      <SectionsContainer className="App" {...options}>
        <Section>
          <Intro />
        </Section>
        <Section>
          <AboutProject />
        </Section>
        <Section>
          <MeetMichael />
        </Section>
        <Section>
          <Map />
        </Section>
        <Section>
          <Blog />
        </Section>
      </SectionsContainer>
    );
  }
}

export default App;
