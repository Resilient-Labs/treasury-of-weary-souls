import React from 'react';
import './SidePanel.css';
import logo from './../Shared/img/logo-blk.svg';
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
            Recent portrayals of American slavery — from 12 Years a Slave and Django Unchained to 
            Walter Johnson’s River of Dark Dreams and Sven Beckert’s Empire of Cotton — have emphasized 
            the brutal violence on cotton plantations in the years preceding the Civil War. 
            What they miss is that during the same period, slaves that were engaged in other 
            enterprises developed skills that placed them at the heart of industrial capitalism.
            </p>
            <p>
            Especially after the slave trade was outlawed in 1808, planters found ways to keep 
            human bondage profitable, including smuggling, controlled breeding, and renting slaves 
            to business owners. This last option became especially pervasive in Virginia and the port 
            cities of the Ohio River and Atlantic Coast. A slew of industries — from blacksmithing and 
            carpentry to large-scale railroad construction, coal mining, and steamboat operations 
            — were fortified by the skilled labor of the enslaved.
            </p>
            <p>
            These men and women became such valuable assets, in fact, that their owners sought to 
            insure them as such. By the 1840s, the number of slaves insured in the South mirrored 
            the number of free whites with life insurance in the North — and both kinds of policies 
            could be issued by the same companies. Slave insurance was one of the earliest forms of 
            industrial risk management, providing an important source of revenue for some of today’s 
            largest multinational insurance companies. It also makes clear that the recent economic 
            crisis, driven by credit default swaps, was not the first time new financial instruments, 
            utilized by AIG and its peers, shaped the lives of U.S. workers. And it won’t be the last.
            </p>
            <p>
            Slave insurance was issued by a wide range of companies in the North and South and sold both 
            to people who owned many slaves and to those who owned just a few. The map here shows about 
            1,300 antebellum-era policies found in the archives of the world’s largest insurance companies, 
            including Aetna, AIG, and New York Life. The archives are incomplete, and evidence suggests that 
            at least 85 percent of policy records may have been lost over time. Yet the available figures 
            show that the market for slave insurance was mostly urban and especially vibrant in areas where 
            plantation agriculture was in relative decline.
            </p>
            <header>
                <small>Slavery Data Collection & Analysis: Michael Ralph</small>
                <small>Web Development by <a href="http://www.resilientcoders.org" target="_blank" rel="noopener noreferrer">Resilient Coders</a></small>
                <small>Design: Emily O'Brien</small>
            </header>
            {/* <ul className="side-panel-states-list"> // FIXME: DELETE
                {renderStatesInformation(states)}
            </ul> */}
        </article>
    </aside>
)
// FIXME: DELETE
// function renderStatesInformation(states) {
//     return states.map((state) => {
//         return (
//             <li className="side-panel-states-list-item" key={state.id}>
//                 <h6 className="side-panel-states-list-headline">{ state.state }</h6>
//                 <img className="side-panel-states-list-icon" src={ state.icon } alt={ state.state }/>
                
//                 <p className="side-panel-states-list-text">
//                     In {state.state}, the biggest insurer of slaves was insurance company { state.insurer }. On average, slaves paid a policy premium of $XX. Accounting for inflatation, in today's economy, that amounts to $XXXX per slave.
//                 </p>
//             </li>
//         )
//     })    
// }

// FIXME: DELETE
// function renderList(states, names) {
//     return states.map((state) => {
//         let filteredNames = names.filter((soul) => {
//             return soul.state === state;
//         })

//         return (
//             <div className="side-panel-column" key={state == null ? 'unknown' : state}>
//                 <h5 className="side-panel-column-headline">{state == null ? 'Unknown Location' : state}</h5>
//                 <ul className={`side-panel-list`} key={state}>
//                     {filteredNames.map((soul, index) => {
//                         if (soul.name !== '') {
//                             return <li className={`side-panel-listed-name soul-named-` + soul.name}
//                                 key={index}>{soul.name} </li>;
//                         }
//                     })
//                     }
//                 </ul>
//             </div>
//         )
//     });
// }

export default SidePanel;