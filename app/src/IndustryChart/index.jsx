import React, { Component } from 'react';
import * as d3 from 'd3';
import SidePanel from '../SidePanel/SidePanel';
import MapNavigation from '../MapNavigation/MapNavigation';
import axios from 'axios';
import './IndustryChart.css';
import './Tooltip.css';

class IndustryChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            states: [],
            statesNew: [],
            insurers: [],
            namesByState: [],
            countByInsurer: [],
            stateIds: [],
            soulsByStateId: {},
            soulsByOccupation: {},
            soulsByState: {}
        }
        this.renderChartBar = this.renderChartBar.bind(this);
        this.filterInsurers = this.filterInsurers.bind(this);
        this.getAllWearySouls = this.getAllWearySouls.bind(this);
        this.filterOutDuplicates = this.filterOutDuplicates.bind(this);
    }
    componentDidMount() {
        this.init();
    }

    init() {
        this.getAllWearySouls();
    }

    filterOutDuplicates(arr) {
        let seen = {};
        let output = [];
        const len = arr.length;
        let j = 0;
        for (let i = 0; i < len; i++) {
            let item = arr[i];
            if (seen[item] !== 1) {
                seen[item] = 1;
                output[j++] = item;
            }
        }
        return output;
    }

    mapArrValuesToCount(arr) {
        return arr.reduce((prev, cur) => {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});
    }

    objectSoulsById(arr) {
        let dataObject = {};
        for (var i = 0; i < arr.length; i++) {
            if (dataObject[arr[i].state_id] === undefined) {
                let objectValueArray = [];
                objectValueArray.push(arr[i])
                dataObject[arr[i].state_id] = objectValueArray
            } else {
                dataObject[arr[i].state_id].push(arr[i]);
            }
        }
        return dataObject;
    }

    objectSoulsByState(arr) {
        let dataObject = {};
        for (var i = 0; i < arr.length; i++) {
            if (dataObject[arr[i].state_abbreviated] === undefined) {
                let objectValueArray = [];
                objectValueArray.push(arr[i])
                dataObject[arr[i].state_abbreviated] = objectValueArray
            } else {
                dataObject[arr[i].state_abbreviated].push(arr[i]);
            }
        }
        return dataObject;
    }

    objectSoulsByOccupation(arr) {
        let dataObject = {};
        for (var i = 0; i < arr.length; i++) {
            if (dataObject[arr[i].occupation] === undefined) {
                let objectValueArray = [];
                objectValueArray.push(arr[i])
                dataObject[arr[i].occupation] = objectValueArray
            } else {
                dataObject[arr[i].occupation].push(arr[i]);
            }
        }
        return dataObject;
    }

    getAllWearySouls() {
        let ref = this;
        axios.get("/api/wearysouls/")
            .then(function (response) {
                let wearysouls = response.data;
                // console.log(wearysouls);
                let insurers = wearysouls.map((soul) => {
                    return soul.insurancefirm;
                })
                let states = wearysouls.map((soul) => {
                    return soul.state;
                })
                let namesByState = wearysouls.map((soul) => {
                    return { state: soul.state, name: soul.name }
                })
                let stateIds = ref.filterOutDuplicates(wearysouls.map((soul) => {
                    return soul.state_id;
                }).filter((ids) => { return ids !== null; }))
                insurers.sort();
                states.sort();
                ref.setState({ insurers: ref.filterOutDuplicates(insurers) })
                ref.setState({ statesNew: ref.filterOutDuplicates(states) }) // FIXME: replace statesNew with states
                ref.setState({ namesByState: namesByState })
                ref.setState({ countByInsurer: ref.mapArrValuesToCount(insurers) });
                ref.setState({ stateIds: stateIds })
                ref.setState({ soulsByOccupation: ref.objectSoulsByOccupation(wearysouls) })
                ref.setState({ soulsByState: ref.objectSoulsByState(wearysouls) })
                //console.log(ref.objectSoulsByState(wearysouls));
            })
            .then(function () {
                ref.renderChartBar();
                ref.renderIndustryChart();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    filterInsurers() {
        let filteredInsurers = [];
        let otherCount = 0;
        for (let insurer in this.state.countByInsurer) {
            if (this.state.countByInsurer[insurer] > 10) {
                filteredInsurers.push({
                    insurer: insurer,
                    count: this.state.countByInsurer[insurer],
                });
            } else {
                otherCount += this.state.countByInsurer[insurer];
            }
        }
        filteredInsurers.push({ insurer: 'Other', count: otherCount });
        return filteredInsurers;
    }

    renderIndustryChart() {
        let obj = this.state.soulsByState;
        console.log(obj);

        let objCopy = Object.assign({}, obj);
        delete objCopy["not listed"];
        delete objCopy[""];
        delete objCopy.NL;
        console.log(objCopy);
    }

    renderChartBar() {
        let obj = this.state.soulsByOccupation;
        var keys = Object.keys(obj);
        let total = 0;

        for (var i = 0; i < keys.length; i++) {
            var val = obj[keys[i]];
            if (keys[i] == "NL") {
                // do nothing
            } else {
                total += val.length;
            }
        }
        // assign a copy as to not mutate the original, then delete NL so that not listed
        // souls do not appear in the chart
        let objCopy = Object.assign({}, obj);
        delete objCopy.NL;

        var x = d3.scaleLinear()
            .domain([0, total])
            .range([0, total]);

        let chartBar = d3.select(".industry-chart-bar")
            .selectAll("div")
            .data(Object.keys(objCopy).map((soul) => {
                return objCopy[soul]
            }))
            .enter()
            .append("div")
            .attr("class", "industry-chart-bar-section")
            .attr("occupation", (data) => {
                return data[0].occupation
            })
            .attr("records", (data) => {
                return data.length;
            })
            .attr("percent-of-workforce", (data) => {
                return ((data.length / total) * 100) + "%";
            })
            .attr("total-known-records", total)
            .style("width", (data) => {
                return ((data.length / total) * 100) + "%";
            })
        // .on("mouseover", function (data, idx) {
        //     // let currentTooltip = d3.selectAll('.tooltip')._groups[0][idx];
        //     // d3.select(currentTooltip)
        //     // .transition()
        //     // .duration(200)
        //     // .style("visibility", "visible");
        // })
        // .on("mouseout", function (data, idx) {
        //     // let currentTooltip = d3.selectAll('.tooltip')._groups[0][idx];
        //     // d3.select(currentTooltip)
        //     // .transition()
        //     // .duration(200)
        //     // .style("visibility", "hidden");
        // })

        chartBar.append("div")
            .attr("class", "tooltip")

        // Set tooltip for showing data associated with a portion of the bar
        let tooltip = d3.selectAll(".tooltip");

        tooltip.append("label")
            .attr("class", "tooltip-occupation")
            .text((data) => data[0].occupation);

        tooltip.append("span")
            .attr("class", "tooltip-record")
            .text((data) => data.length)
            .append("label")
            .attr("class", "tooltip-record-label")
            .text("records");

        tooltip.append("span")
            .attr("class", "tooltip-percentage")
            .text((data) => "%" + ((data.length / total) * 100).toFixed(1))
            .append("label")
            .attr("class", "tooltip-percentage-label")
            .text("of workforce");
    }

    render() {
        return (
            <section className="industry-chart-container">
                <MapNavigation />
                <div className="industry-chart-view"></div>
                <div className="industry-chart-bar-container">
                    <p className="industry-chart-bar-title">Industry Breakdown</p>
                    <div className="industry-chart-bar"></div>
                    <div className="industr-char-bar-axis"></div>
                </div>
                <SidePanel states={this.state.statesNew} namesByState={this.state.namesByState} />
            </section>

        );
    }
}

export default IndustryChart;
