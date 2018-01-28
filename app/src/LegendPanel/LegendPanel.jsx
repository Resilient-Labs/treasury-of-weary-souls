import React from 'react';
import './LegendPanel.css';

const LegendPanel = (props) => (
    <div className="legend-panel">
        { insurers.map((insurer) => {
            return <span className="legend-panel-button legend-panel-insurer-button" data-filter={insurer}>{ insurer }</span>
        }) }

        <div>
            <label>
                <small>Filter by:</small>
            </label>
            { filters.map((filter, index) => {
                console.log(index);
                var className = index === 0 ? "active legend-panel-button legend-panel-filter-button" : "legend-panel-button legend-panel-filter-button"
                return <span className={className} onClick={ () => switchFilter() } data-filter={filter}>{ filter }</span>
            }) }
        </div>
    </div>
)

let insurers = ["ALL", "NYLI", "AETNA", "BLIC", "AIG",];
let filters = ["INSURER", "INDUSTRY"]

function switchFilter() {
    console.log("Filter by");
}
export default LegendPanel;