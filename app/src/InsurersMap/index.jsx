import React, { Component } from 'react';
import InsurersMapView from '../InsurersMapView/InsurersMapView';
import SidePanel from '../SidePanel/SidePanel';
import InsurersMapKey from '../InsurersMapKey/InsurersMapKey';
import MapNavigation from '../MapNavigation/MapNavigation';
import Loading from '../Loading'
import * as d3 from 'd3';
import * as topojson from 'topojson';
import './InsurersMap.css';
import './InsurersColors.css';
import axios from 'axios';

class InsurersMap extends Component {
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
      loading: true
    }
    this.renderMap = this.renderMap.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.filterInsurers = this.filterInsurers.bind(this);
    this.getAllWearySouls = this.getAllWearySouls.bind(this);
    this.filterOutDuplicates = this.filterOutDuplicates.bind(this);
    this.appendAllSouls = this.appendAllSouls.bind(this);
    this.compareByInsurer = this.compareByInsurer.bind(this);
    this.createTooltips = this.createTooltips.bind(this);
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
        ref.setState({ statesNew: ref.filterOutDuplicates(states) }) // TODO: replace with states
        ref.setState({ namesByState: namesByState })
        ref.setState({ countByInsurer: ref.mapArrValuesToCount(insurers) });
        ref.setState({ stateIds: stateIds })
        ref.setState({ soulsByStateId: ref.objectSoulsById(wearysouls) })
        //console.log(ref.objectSoulsById(wearysouls));
      })
      .then(function () {
        ref.setState({ loading: false });
        ref.renderMap();
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

  renderMap() {
    let ref = this;
    let width = '500',
      height = '500';

    let insurersMap = d3.select('#insurers-map-wrapper')
      .append('svg')
      .attr('class', 'insurers-map-svg')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', '450 150 ' + width + ' ' + height);

    // let projection = d3.geoAlbersUsa()
    var path = d3.geoPath();
    d3.json("https://d3js.org/us-10m.v1.json", function (error, data) {
      if (error) throw error;
      let states = topojson.feature(data, data.objects.states).features;
      console.log(states);

      let stateIds = ['01', '05', '10', '12', '13', '17', '18', '19', '21', '22', '24', '28', '29', '34', '37', '39', '42', '45', '47', '51', '54'];
      let filteredStates = states.filter((state) => {
        return stateIds.includes(state.id);
      })
      console.log(filteredStates);
      let stateContainer = insurersMap.selectAll('state-container')
        .data(filteredStates)
        .enter()
        .append('g')
        .attr('class', 'state-container')
        .attr("container-stateId", (state) => {
          return state.id
        })


      // add paths for each state
      stateContainer.append('path')
        .attr('class', 'state')
        .attr('stateId', (state) => {
          return state.id
        })
        .attr('state', (state) => {
          return 'state-' + state.id
        })
        .attr('d', path);

      let obj = ref.state.soulsByStateId;

      // loop through all of the states and each soul to display a point for every soul
      let objCopy = Object.assign({}, obj);
      var keys = Object.keys(objCopy);
      ref.appendAllSouls(keys, path, obj);
      ref.createTooltips();

      
    });
  }

  // comparator function to compare insurers
  compareByInsurer(a, b) {
    if (a.insurancefirm < b.insurancefirm)
      return -1;
    if (a.insurancefirm > b.insurancefirm)
      return 1;
    return 0;
  }

  appendAllSouls(keys, path, obj) {
    // console.log(keys); // keys => each state's id
    // console.log(obj); // obj => all souls by each state
    for (var i = 0; i < keys.length; i++) {
      var val = obj[keys[i]];
      var stateId = keys[i];
      val.sort(this.compareByInsurer);

      var pathCX = 0;
      var pathCY = 0;
      d3.select("[container-stateId='" + stateId + "']")
        .append('circle')
        .attr('class', 'pack')
        .attr('r', 30)
        .attr("cx", (d) => {
          pathCX = path.centroid(d)[0];
          return path.centroid(d)[0];
        })
        .attr("cy", (d) => {
          pathCY = path.centroid(d)[1];
          return path.centroid(d)[1];
        })

      var circles = d3.packSiblings(
        d3.range(val.length)
          .map(function (r) {
            return { r: 1.5 };
          }));

      if (stateId == null) {
        // do nothing 
      } else {

        d3.select("[container-stateId='" + stateId + "']")
          .selectAll("circle")
          .data(circles)
          .enter()
          .append("circle")
          .attr("order", function (d, i) { return i })
          .attr("class", "insurer-map-point")
          .attr("name", function (d, i) { return val[i - 1].name })
          .attr("occupation", function (d, i) { return val[i - 1].occupation })
          .attr("owner", function (d, i) { return val[i - 1].owner })
          .attr("city", function (d, i) { return val[i - 1].city })
          .attr("insurer", function (d, i) { return val[i - 1].insurancefirm })
          .attr("stateId", function (d, i) { return val[i - 1].state_id })
          .attr("r", function (d) { return d.r - 0.25; })
          .attr("cx", function (d) { return d.x + pathCX; })
          .attr("cy", function (d) { return d.y + pathCY; })
          .append("div")
          .attr("class", "insurer-map-point-tooltip")

          
          // .each (function() {
          //   d3.select(this)
          //     .append("span")
          //     .attr("class", "insurer-map-point-tooltip-name")
          //     .text(function(d, i) { return val[i-1].name ? val[i=1].name : "Unknown Name"} )
            
          //   d3.select(this)
          //     .append("span")
          //     .attr("class", "insurer-map-point-tooltip-owner")
          //     .text(function(d, i) { return val[i-1].owner ? val[i=1].owner : "Unknown Name"} )
          // })
          // .append("span")
          // .attr("class", "industry-chart-view-tooltip-location")
          // .text(
          // data[itrCount].city ?
          //     data[itrCount].city + ", " + data[itrCount].state_abbreviated : data[itrCount].state_abbreviated
          // )
          // .attr("class", "tooltip-insurer")
        // .transition()
        //   .ease(d3.easeCubicOut)
        //   .delay(function(d) { return Math.sqrt(d.x * d.x + d.y * d.y) * 10; })
        //   .duration(1000)
      }
    }
  }

  createTooltips() {
    let ref = this;
    let itrCount = 0; // reset this count itr below after appending each node
    d3.selectAll('.insurer-map-point-tooltip')
        .each(function (data, idx) {
          console.log(data);
          // d3.select(ref).append("span")
          //     .attr("class", "insurer-map-point")
          //     .text(data[itrCount].name ? data[itrCount].name : "Unknown Name")

          //     itrCount++;
          //     if (data.length <= itrCount) {
          //         itrCount = 0;
          //     }
          });
  }

  renderChart() {
    let filteredInsurers = this.filterInsurers();
    // let countsArr = [];
    var insurers = filteredInsurers.map(data => {
      return data.count;
    })
    var y = d3.scaleLinear()
      .domain([0, d3.max(insurers)])
      .range([0, 156]);

    let chart = d3.select(".insurers-map-key")
      .selectAll("div")
      .data(filteredInsurers)
      .enter()
      .append("div")
      .attr("class", "chart-bar")
      .attr("insurer", (data) => {
        return data.insurer
      })
      .style("height", (data) => {
        return y(data.count) + "px";
      });

    chart.append("text")
      .text((d) => d.count)
      .attr("class", "chart-bar-text");

    chart.append("label")
      .attr('y', 0)
      .attr("class", "class-bar-label")
      .text((d) => d.insurer);
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <section className="insurers-map-container">
          <MapNavigation />
          <InsurersMapView souls={this.state.statesNew} />
          <SidePanel states={this.state.statesNew} namesByState={this.state.namesByState} />
          <InsurersMapKey />
        </section>

      );
    }
  }
}

export default InsurersMap;