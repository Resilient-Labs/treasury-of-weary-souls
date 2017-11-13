import React from 'react';
import './Shared/styles/App.css';
import Intro from './Intro';
import AboutProject from './AboutProject';
import MeetMichael from './MeetMichael';
import { SectionsContainer, Section } from 'react-fullpage';

let options = {
  sectionClassName: 'section',
  anchors: ['intro', 'about', 'meet-michael'],
  scrollBar: false,
  navigation: true,
  autoScrolling: false,
  verticalAlign: false,
  arrowNavigation: true,
  scrollingSpeed: 500
};

const Home = props => {
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
    </SectionsContainer>
  );
}

export default Home;
