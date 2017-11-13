import React from 'react';
import './SidePanel.css';

const SidePanel = (props) => (
    <aside className='sidepanel'>
        { renderList(props.states, props.namesByState)}
    </aside>
)

function renderList(states, names) {
    return states.map( (state) => {
        let filteredNames = names.filter( (soul) => {
            return soul.state === state;
        })

        return (
            <div className="state-side-panel-column" key={ state == null ? 'unknown' : state }>
                <h5 className="side-panel-headline">{ state == null ? 'Unknown Location' : state }</h5>
                <ul className={ `side-panel-list` } key={ state }>
                { filteredNames.map( (soul, index) => { 
                    if (soul.name !== '') {
                        return <li className={ `side-panel-listed-name soul-named-` + soul.name }
                        key={ index }>{ soul.name } </li>; } 
                    })
                }
                </ul>
            </div>
        )
    });
}

export default SidePanel;