import React, { Component } from 'react';
import AboutProject from './project.jsx';
import AboutMichael from './michael.jsx';


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