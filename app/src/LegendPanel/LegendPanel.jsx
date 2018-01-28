import React from 'react';
import './LegendPanel.css';

const LegendPanel = (props) => (
    <div className="legend-panel">
        <span className="legend-panel-button">NYLI</span>
        <span className="legend-panel-button">AETNA</span>
        <span className="legend-panel-button">BLIC</span>
        <span className="legend-panel-button">AETNA</span>

        <div>
            <span onClick={ () => switchFilter() }>
                Insurer
            </span>
            <span onClick={ () => switchFilter() }>
                Industry
            </span>
        </div>
    </div>
)

function switchFilter() {
    console.log("Filter by");
}
export default LegendPanel;