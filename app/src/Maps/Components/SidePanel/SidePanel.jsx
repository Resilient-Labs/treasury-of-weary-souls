import React from 'react';
import './SidePanel.css';

const SidePanel = (props) => (
    <aside className='sidepanel'>
        <h4>SidePanel</h4>
        { props.states.map(usa_state => {
            let keye = "state-"+ usa_state.abbreviation;
            return <p key={ keye }>{ usa_state.name }</p>;
        })}
    </aside>
)

export default SidePanel;