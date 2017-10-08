import React, { Component } from 'react';
import './styles/intro.css';

class Intro extends Component {
  render() {
      const introSubHeadline = 'Treasury of';
      const introHeadline = 'WEARY SOULS';
      const introText= 'The Treasury of Weary Souls is the world’s most comprehensive ledger of the skilled Slaves who built American Industry. With more than 1300 policy records, the Treasurey highlights the pivotal role of enslaved workers in America’s most lucrative and dangerous antebellum industries.';
        return (
            <section className='intro-container' id="intro">
                <h3>{ introSubHeadline }</h3>
                <h1>{ introHeadline }</h1>
                <p>{ introText }</p>
            </section>
        )
    }
}

export default Intro;