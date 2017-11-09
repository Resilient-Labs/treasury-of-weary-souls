import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import './HeatMap.css';

class HeatMapView extends Component {

    renderMap() {
        let width = '960',
            height = '600';
        let heatmap = d3.select('#heatmap-wrapper')
            .append('svg')
            .attr('class', 'heatmap-svg')
            .attr('preserveAspectRatio', 'xMidYMid')
            .attr('viewBox', '0 0 ' + width + ' ' + height);

        // let projection = d3.geoAlbersUsa()
        var path = d3.geoPath();
        let q = d3.queue();
        q.defer(d3.json, 'https://d3js.org/us-10m.v1.json')
            .await(function (error, data) {
                if (error) {
                    throw error;
                }
                // console.log(data);
                let states = topojson.feature(data, data.objects.states).features;
                // console.log(states);
                // let bef = states.filter((state) => {
                //     console.log(parseInt(state.id));
                //     return parseInt(state.id) > 25
                // })
                // add paths for each state
                heatmap.selectAll('.state')
                    .data(states)
                    .enter().append('path')
                    .attr('class', 'state')
                    .attr('d', path);

                heatmap.selectAll('.state-points')
                    .data(states)
                    .enter()
                    .append("circle")
                    .attr("r", "4")
                    .attr("cx", function (d) {
                        return path.centroid(d)[0];
                    })
                    .attr("cy", function (d) {
                        return path.centroid(d)[1];
                    })
                    .style("fill", "red")

                // heatmap.selectAll('.stateText')
                //     .data(states)
                //     .enter().append("text")
                //     .attr("x", function (d) {
                //         return path.centroid(d)[0];
                //     })
                //     .attr("y", function (d) {
                //         return path.centroid(d)[1];
                //     })
                //     .attr("text-anchor", "middle")
                //     .attr("font-size", "12px")
                //     .style("fill", "red")
                //     .append("circle")
                //     .attr("r", "4")
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