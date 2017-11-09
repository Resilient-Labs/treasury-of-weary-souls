import React, { Component } from 'react';
import HeatMapView from './Components/HeatMap/HeatMapView';
import SidePanel from './Components/SidePanel/SidePanel';
import InsurersChart from './Components/InsurersChart/InsurersChart';
import * as d3 from 'd3';
import './Maps.css';
import axios from 'axios';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      statesNew: [],
      insurers: [],
      namesByState: [],
      countByInsurer: [],
    }
    this.getAllStates = this.getAllStates.bind(this);
    this.getInsurersAndCount = this.getInsurersAndCount.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.filterInsurers = this.filterInsurers.bind(this);
    this.getAllWearySouls = this.getAllWearySouls.bind(this);
    this.filterOutDuplicates = this.filterOutDuplicates.bind(this);
  }
  componentDidMount() {
    this.init();
  }

  init() {
    // this.getAllStates();
    // this.getInsurersAndCount();
    this.getAllWearySouls();
    // this.renderChart();
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
    return arr.reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});
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
        insurers.sort();
        states.sort();
        ref.setState({ insurers: ref.filterOutDuplicates(insurers) })
        ref.setState({ statesNew: ref.filterOutDuplicates(states) }) // TODO: replace with states
        ref.setState({ namesByState: namesByState })
        ref.setState({ countByInsurer: ref.mapArrValuesToCount(insurers) });
        // console.log(ref.state.insurers);
        // console.log(ref.state.statesNew);
        // console.log(namesByState);
        // console.log(ref.state.countByInsurer)
        ref.renderChart();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getAllStates() {
    let ref = this;
    axios.get("/api/states/")
      .then(function (response) {
        // console.log(response);
        // console.log(response.data);
        let states = response.data;
        ref.setState({ states: states })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getInsurersAndCount() {
    let ref = this;
    axios.get("/api/insurancefirms/")
      .then(function (response) {
        // console.log(response);
        // console.log(response.data);
        let insurers = response.data;
        ref.setState({ insurers: insurers })
        ref.renderChart();
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

  renderChart() {
    let filteredInsurers = this.filterInsurers();
    // let countsArr = [];
    var counts = filteredInsurers.map(c => {
      console.log(c);
      return c.count;
    })
    var y = d3.scaleLinear()
      .domain([0, d3.max(counts)])
      .range([0, 156]);

    let chart = d3.select(".insurers-chart")
      .selectAll("div")
      .data(filteredInsurers)
      .enter()
      .append("div")
      .attr("class", "chart-bar")
      .style("height", function (d) { return y(d.count) + "px"; });
  
      chart.append("text")
      .text((d)=> d.count)
      .attr("class", "chart-bar-text");
      
      chart.append("label")
      .attr('y', 0)
      .attr("class", "class-bar-label")
      .text( (d) => d.insurer);
  }

  render() {
    return (
      <section className="map-container">
        <HeatMapView states={this.state.states} />
        <SidePanel states={this.state.statesNew} namesByState={this.state.namesByState} />
        <InsurersChart />
      </section>
    );
  }
}

export default Map;