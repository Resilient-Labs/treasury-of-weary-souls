import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
// import * as queue from 'd3-queue';
import './HeatMap.css';

class HeatMapView extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {date: new Date()};
    //     this.renderMap = this.renderMap.bind(this);
    // }
    renderMap() {
        let width = '960',
            height = '600';
        let heatmap = d3.select('#heatmap-wrapper')
            .append('svg')
            .attr('class', 'heatmap-svg')
            .attr('preserveAspectRatio', 'xMidYMid')
            .attr('viewBox', '0 0 ' + width + ' ' + height);
            // .attr('width', width)
            // .attr('height', height);
        let projection = d3.geoAlbersUsa()
            // .scale(1000)
            // .translate([width / 2, height / 2]);
        var path = d3.geoPath();
            // .projection(projection);
        let q = d3.queue();
        q.defer(d3.json, 'https://d3js.org/us-10m.v1.json')
            .await(function (error, data) {
                if (error) {
                    throw error;
                }
                console.log(data);
                let states = topojson.feature(data, data.objects.states).features;
                console.log(states);
                states.map((state) => {
                    console.log(state.properties.name);
                })
                // add paths for each state
                heatmap.selectAll('.state')
                    .data(states)
                    .enter().append('path')
                    .attr('class', 'state')
                    .attr('d', path)
            });

    }
    componentDidMount() {
        this.renderMap();
    }
    render() {
        return (
            <div id='heatmap-wrapper'></div>
        );
    }
}

export default HeatMapView;