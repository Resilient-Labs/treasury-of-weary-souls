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
      insurers: {},
      insurersCount: 0,
    }
    this.getAllStates = this.getAllStates.bind(this);
    this.getInsurersAndCount = this.getInsurersAndCount.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }
  componentDidMount() {
    this.init();
  }

  init() {
    this.getAllStates();
    this.getInsurersAndCount();
    // this.renderChart();
  }

  getAllStates() {
    let ref = this;
    axios.get("/api/states/")
      .then(function (response) {
        console.log(response);
        console.log(response.data);
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
        console.log(response);
        console.log(response.data);
        let insurers = response.data;
        ref.setState({ insurers: insurers })
        // let count = 0;
        // for (let i in insurers) {
        //   count += insurers[i]
        // }
        // ref.setState({ insurersCount: count })
        ref.renderChart();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  renderChart() {
    var counts = Object.keys(this.state.insurers).map(insurer => {
      if (this.state.insurers[insurer] > 10) {
        return this.state.insurers[insurer];
      }
    });
    var y = d3.scaleLinear()
      .domain([0, d3.max(counts)])
      .range([0, 156]);

    d3.select(".insurers-chart")
      .selectAll("div")
      .data(counts)
      .enter().append("div")
      .style("height", function (d) { return y(d) + "px"; })
      .text(function (d) { return d; });
  }

  render() {
    return (
      <section className="map-container" id="map">
        <HeatMapView />
        <SidePanel states={this.state.states} />
        <InsurersChart />
      </section>
    );
  }
}

export default Map;