import React from 'react';
import './LegendPanel.css';

const LegendPanel = (props) => (
    <div className="legend-panel">
        <div>
            <label className="legend-panel-label">
                <small>Filter by:</small>
            </label>
            { filters.map((filter, index) => {
                var className = index === 0 ? "active legend-panel-button legend-panel-filter-button" : "legend-panel-button legend-panel-filter-button";
                return <span className={className} onClick={ () => switchFilter() } data-filter={filter} key={filter}>{ filter }</span>
            }) }
        </div>
    </div>
)
let filters = ["INSURER", "INDUSTRY"]

function switchFilter() {
    console.log("Filter by");
}
export default LegendPanel;