import React from 'react';
import ArrowDown from '../Shared/ArrowDown';
//import Navigation from '../Shared/Navigation';
import './AboutProject.css';

const aboutHeadline = "About the Project";
const aboutText = "After the slave trade to the US was outlawed in 1808, Africans were smuggled into the country (a tricky process), they were bred (which depended on the human life cycle), and they were rented (so the people who treated them as property could make as much money as possible). People who rented slaves insured them so that these valuable assets would not be destroyed while in someone else's possession. ";
const title = 'Treasury of Weary Souls';

const AboutProject = props => {
    return (
        <section className="about-project-container">
            <div>
                <h4>{aboutHeadline}</h4>
                <p>{aboutText}</p>
                <p>
                {`Legally slaves were property. But, no other form of property could enhance 
                its value through the skills it acquired. In addition to information on 
                enslaved workers, the `}<i>{title}</i>{` contains data on the financial firms 
                who acquired slave insurance policies during the 20th century and continue to 
                profit from them today.`};
                </p>
            </div>
            <a href="#meet-michael" className="arrow-down-link">
                <span>Meet Michael</span>
                <ArrowDown />
            </a>
        </section>
    )
}

export default AboutProject;