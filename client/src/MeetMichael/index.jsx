import React from 'react';
import michael from './img/michael.jpg';
import ArrowDown from '../Shared/ArrowDown';
import { Link } from 'react-router-dom';
import './MeetMichael.css';

const MeetMichael = props => {
    return (
        <section className="about-michael-container">
            <div>
                <img src={michael} alt="michael ralph" />
                <article className="text-container">
                    <h4>Meet Michael</h4>
                    <p>
                    {`Michael Ralph has a degree in Africana Studies from Morris Brown College 
                    and a doctorate in Anthropology from the University of Chicago. 
                    He is a tenured professor at New York University, where he teaches 
                    “Histories of Capitalism,” “Hip Hop and Politics,” “Digital Humanities,” 
                    and “Armed Resistance.” Michael is dedicated to the quest for quintessential dopeness. 
                    Have any questions on the project? Reach out to Michael at `}
                    <a href="mailto:michael.ralph@nyu.edu" aria-label="Email Michael Ralph">michael.ralph@nyu.edu</a>
                    <Link to="/map" className="mobile-only-link">
                        Click here to interactive with the Data
                    </Link>
                    </p>
                </article>
            </div>
            <Link to="/map" className="arrow-down-link">
                <span>View Data Map</span>
                <ArrowDown />
            </Link>
        </section>
    )
}

export default MeetMichael;