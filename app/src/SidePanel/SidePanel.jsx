import React from 'react';
import './SidePanel.css';
import logo from './../Shared/img/logo-blk.svg';
import { Link } from 'react-router-dom';
// FIXME: DELETE
// import alabamaIcon from './../Shared/img/state-logos/alabama-icon.svg';
// import arkansasIcon from './../Shared/img/state-logos/arkansas-icon.svg';
// import georgiaIcon from './../Shared/img/state-logos/georgia-icon.svg';
// import kentuckyIcon from './../Shared/img/state-logos/kentucky-icon.svg';
// import louisianaIcon from './../Shared/img/state-logos/louisiana-icon.svg';
// import marylandIcon from './../Shared/img/state-logos/maryland-icon.svg';
// import mississippiIcon from './../Shared/img/state-logos/mississippi-icon.svg';
// import missouriiIcon from './../Shared/img/state-logos/missouri-icon.svg';
// import northcarolinaIcon from './../Shared/img/state-logos/northcarolina-icon.svg';
// import southcarolinaIcon from './../Shared/img/state-logos/southcarolina-icon.svg';
// import tennesseeIcon from './../Shared/img/state-logos/tennessee-icon.svg';
// import virginiaIcon from './../Shared/img/state-logos/virginia-icon.svg';

// const alabama = {id: "01", abbreviation: "AL", state: "Alabama", icon: alabamaIcon, insurer: "NYLI"}
// const arkansas = {id: "05", abbreviation: "AR", state: "Arkansas", icon: arkansasIcon, insurer: "NYLI"}
// const georgia = {id: "13", abbreviation: "GA", state: "Georgia", icon: georgiaIcon, insurer: "NYLI"}
// const kentucky = {id: "21", abbreviation: "KY", state: "Kentucky", icon: kentuckyIcon, insurer: "AIG"}
// const louisiana = {id: "22", abbreviation: "LA", state: "Louisiana", icon: louisianaIcon, insurer: "Aetna"}
// const maryland = {id: "24", abbreviation: "MD", state: "Maryland", icon: marylandIcon, insurer: "NYLI"}
// const mississippi = {id: "28", abbreviation: "MS", state: "Mississippi", icon: mississippiIcon, insurer: ""}
// const missouri = {id: "29", abbreviation: "MO", state: "Missouri", icon: missouriiIcon, insurer: ""}
// const northcarolina = {id: "37", abbreviation: "NC", state: "North Carolina", icon: northcarolinaIcon, insurer: "NYLI"}
// const southcarolina = {id: "45", abbreviation: "SC", state: "South Carolina", icon: southcarolinaIcon, insurer: ""}
// const tennessee = {id: "47", abbreviation: "TN", state: "Tennessee", icon: tennesseeIcon, insurer: ""}
// const virginia = {id: "51", abbreviation: "VA", state: "Virginia", icon: virginiaIcon, insurer: "BLIC"}

// var states = [alabama, arkansas, georgia, kentucky, louisiana, maryland, mississippi, missouri, northcarolina, southcarolina
//     , tennessee, virginia]

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
                    <button class="side-panel-link-button">View Blog</button>
                </Link>
            </header>
        </article>
    </aside>
)

export default SidePanel;