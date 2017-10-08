import React, { Component } from 'react';
import './styles/landing.css';

class Landing extends Component {
  render() {
      const landingSubHeadline = 'Treasury of';
      const landingHeadline = 'WEARY SOULS';
      const landingText= 'The Treasury of Weary Souls is the world’s most comprehensive ledger of the skilled Slaves who built American Industry. With more than 1300 policy records, the Treasurey highlights the pivotal role of enslaved workers in America’s most lucrative and dangerous antebellum industries.';
        return (
            <section id='landing-container'>
                <h3>{ landingSubHeadline }</h3>
                <h1>{ landingHeadline }</h1>
                <p>{ landingText }</p>
            </section>
        )
    }
}

export default Landing;