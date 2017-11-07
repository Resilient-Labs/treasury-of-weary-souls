import React, { Component } from 'react';
import AboutProject from './AboutTheProject.jsx';
import AboutMichael from './MeetMichael.jsx';
import './About.css';

class About extends Component {
  render() {
      return (
            <section className="about-container">
                <AboutProject />
                <AboutMichael />
            </section>
        )
    }
}

export default About;