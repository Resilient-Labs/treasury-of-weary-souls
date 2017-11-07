import React, { Component } from 'react';
import './Intro.css';
// import arrowDown from '../../Shared/img/arrow-down.svg';
import ArrowDown from '../../Shared/ArrowDown';
import Navigation from '../../Shared/Navigation';

class Intro extends Component {
    render() {
        const introSubHeadline = 'Treasury of';
        const introHeadline = 'WEARY SOULS';
        const introText = 'The Treasury of Weary Souls is the world’s most comprehensive ledger of the skilled Slaves who built American Industry. With more than 1300 policy records, the Treasurey highlights the pivotal role of enslaved workers in America’s most lucrative and dangerous antebellum industries.';
        return (
            <section className='intro-container'>
                <Navigation />
                <div>
                    <h2>{introSubHeadline}</h2>
                    <h1>{introHeadline}</h1>
                    <p>{introText}</p>
                </div>
                <ArrowDown />
            </section>
        )
    }
}

export default Intro;