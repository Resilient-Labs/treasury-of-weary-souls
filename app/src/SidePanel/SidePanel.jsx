import React from 'react';
import './SidePanel.css';
import { Link } from 'react-router-dom';

const SidePanel = (props) => (
    <aside className='side-panel'>
        <header className="side-panel-header">
            <Link to="/" className="side-panel-header-link">Home</Link>
            <Link to="/blog" className="side-panel-header-link">Blog</Link>
        </header>
        {renderList(props.states, props.namesByState)}
    </aside>
)

function renderList(states, names) {
    return states.map((state) => {
        let filteredNames = names.filter((soul) => {
            return soul.state === state;
        })

        return (
            <div className="side-panel-column" key={state == null ? 'unknown' : state}>
                <h5 className="side-panel-column-headline">{state == null ? 'Unknown Location' : state}</h5>
                <ul className={`side-panel-list`} key={state}>
                    {filteredNames.map((soul, index) => {
                        if (soul.name !== '') {
                            return <li className={`side-panel-listed-name soul-named-` + soul.name}
                                key={index}>{soul.name} </li>;
                        }
                    })
                    }
                </ul>
            </div>
        )
    });
}

export default SidePanel;