import React from 'react';
import './Intro.css';
import ArrowDown from '../Shared/ArrowDown';

const introSubHeadline = 'Treasury of';
const introHeadline = 'WEARY SOULS';
const title = 'Treasury of Weary Souls';
const Intro = props => {
    return (
        <section className='intro-container'>
            <div>
                <h2>{introSubHeadline}</h2>
                <h1>{introHeadline}</h1>
                <p>
                    {`The `}<i>{title}</i>{` is the world’s most comprehensive
                    ledger of the enslaved Africans who built American industry. 
                    With more than 1300 policy records, the `}<i>{title}</i>{`
                    highlights the pivotal contributions of skilled slaves to the 
                    nation's most lucrative and most dangerous antebellum enterprises. 
                    The `}<i>{title}</i>{` also contains data on financial 
                    firms who continue to profit from slave insurance policies today.`}
                </p>
            </div>
            <a href="#about" className="arrow-down-link">
                <ArrowDown />   
            </a>
        </section>
    )
}

export default Intro;