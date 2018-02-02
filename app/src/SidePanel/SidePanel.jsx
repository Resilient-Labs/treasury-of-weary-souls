import React from 'react';
import './SidePanel.css';
import logo from './../Shared/img/logo-blk.svg';
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
            Because a slave did not earn a salary did not mean that he was without commercial value. 
            Highly skilled slaves were in fact so critical to the development of the antebellum economy of the American South, 
            that it was common for slave owners to take out life insurance policies on those slaves; 
            particularly as owners rented their slaves to each other. AIG, Aetna, New York Life Insurance, and BLIC. 
            Explore the different states to see which life insurance companies profited the most from slave policies, per state.
            </p>
            <header>
                <small>Slavery Data Collection & Analysis: Michael Ralph</small>
                <small>Web Development by <a href="http://www.resilientcoders.org" target="_blank" rel="noopener noreferrer">Resilient Coders</a></small>
                <small>Design: Emily O'Brien</small>
            </header>
            {/* <ul className="side-panel-states-list">
                {renderStatesInformation(states)}
            </ul> */}
        </article>
    </aside>
)

function renderStatesInformation(states) {
    return states.map((state) => {
        return (
            <li className="side-panel-states-list-item" key={state.id}>
                <h6 className="side-panel-states-list-headline">{ state.state }</h6>
                <img className="side-panel-states-list-icon" src={ state.icon } />
                
                <p className="side-panel-states-list-text">
                    In {state.state}, the biggest insurer of slaves was insurance company { state.insurer }. On average, slaves paid a policy premium of $XX. Accounting for inflatation, in today's economy, that amounts to $XXXX per slave.
                </p>
            </li>
        )
    })    
}

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