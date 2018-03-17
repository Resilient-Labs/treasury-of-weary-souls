import React from 'react';
import './SidePanel.css';
import logo from './../Shared/img/logo-blk.svg';
import { Link } from 'react-router-dom';

const SidePanel = (props) => (
    <aside className='side-panel'>
        <article className="side-panel-article">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <h4>About the Project</h4>
            <p>
            Recent scholarship on slavery and capitalism tends to emphasize the relationship between violence and 
            productivity on cotton plantations in the decades leading up to the US Civil War. These timely interventions 
            tend to overlook the fact that, during the same period, enslaved workers became essential to all of the nation's 
            most profitable industries.
            </p>
            <p>
            After the slave trade to the US was outlawed in 1808, Africans were smuggled into the country (a tricky process), 
            they were bred (which depended on the human life cycle), and they were rented (so the people who treated them as 
            property could make as much money as possible). People who rented slaves insured them so that these valuable assets 
            would not be destroyed while in someone else's possession. Renting slaves was especially common in urban centers in 
            close proximity to key industries. The precious skills of enslaved workers were essential to blacksmithing and 
            carpentry, railroad construction, coal mining, and steamboats, besides other commercial enterprises.
            </p>
            <p>
            By the 1840s, the number of enslaved workers insured in chief industries of the Upper South mirrored the number of 
            free whites with life insurance living in Northern cities — and both kinds of policies could be issued by the same 
            companies. Slave insurance was one of the earliest forms of industrial risk management, providing an important 
            source of revenue for some of today’s largest multinational insurance companies.
            </p>
            <p>
            The Treasury of Weary Souls features about 1,300 antebellum policies, nearly half of them contributing to profits 
            for some of the world’s largest insurance companies, including Aetna, AIG, and New York Life. Slave insurance was 
            even more significant for US finance than these records reveal since The Treasury of Weary Souls features at most 
            fifteen percent of antebellum slave insurance policies.
            </p>
            <header>
                <small>Slavery Data Collection & Analysis: Michael Ralph</small>
                <small>Web Development by <a href="http://www.resilientcoders.org" target="_blank" rel="noopener noreferrer">Resilient Coders</a></small>
                <small>Design: Emily O'Brien</small>                
                <Link to="/post">
                    <button className="side-panel-link-button">The work of Weary Souls</button>
                </Link>
            </header>
        </article>
    </aside>
)

export default SidePanel;