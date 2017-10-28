import React, { Component } from 'react';
import michael from './img/michael.jpg';
import './styles/about.css'

class AboutMichael extends Component {
  render() {
      const aboutText = "Michael Ralph has a degree in Africana Studies from Morris Brown College and a doctorate in Anthropology from the University of Chicago. He is a tenured professor at New York University, where he teaches “Histories of Capitalism,” “Hip Hop and Politics,” “Digital Humanities,” and “Armed Resistance.” Michael is dedicated to the quest for quintessential dopeness. ";
        return (
            <section id="michael-ralph" className="about-michael-container">
                <img src={ michael } alt="michael ralph" />
                <p>{ aboutText }</p>
            </section>
        )
    }
}

export default AboutMichael;