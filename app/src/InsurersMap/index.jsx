import React, { Component } from 'react';
// import * as ReactDOM from 'react-dom';
import InsurersMapView from '../InsurersMapView/InsurersMapView';
import SidePanel from '../SidePanel/SidePanel';
import LegendPanel from '../LegendPanel/LegendPanel'
import InsurersMapKey from '../InsurersMapKey/InsurersMapKey';
import Loading from '../Loading'
import * as d3 from 'd3';
import * as topojson from 'topojson';
import './InsurersMap.css';
import './InsurersColors.css';
import './IndustryColors.css';
import './Tooltip.css';
import './IndustryTooltip.css';
import './InteractiveInfoPanel.css';
import axios from 'axios';
// State Icons
import alabamaIcon from './../Shared/img/state-logos/alabama-icon.svg';
import arkansasIcon from './../Shared/img/state-logos/arkansas-icon.svg';
import georgiaIcon from './../Shared/img/state-logos/georgia-icon.svg';
import kentuckyIcon from './../Shared/img/state-logos/kentucky-icon.svg';
import louisianaIcon from './../Shared/img/state-logos/louisiana-icon.svg';
import marylandIcon from './../Shared/img/state-logos/maryland-icon.svg';
import mississippiIcon from './../Shared/img/state-logos/mississippi-icon.svg';
import missouriIcon from './../Shared/img/state-logos/missouri-icon.svg';
import northcarolinaIcon from './../Shared/img/state-logos/northcarolina-icon.svg';
import southcarolinaIcon from './../Shared/img/state-logos/southcarolina-icon.svg';
import tennesseeIcon from './../Shared/img/state-logos/tennessee-icon.svg';
import virginiaIcon from './../Shared/img/state-logos/virginia-icon.svg';
// States
const alabama = { id: "01", abbreviation: "AL", name: "Alabama", icon: alabamaIcon, insurer: "New York Life" }
const arkansas = { id: "05", abbreviation: "AR", name: "Arkansas", icon: arkansasIcon, insurer: "New York Life" }
const georgia = { id: "13", abbreviation: "GA", name: "Georgia", icon: georgiaIcon, insurer: "New York Life" }
const kentucky = { id: "21", abbreviation: "KY", name: "Kentucky", icon: kentuckyIcon, insurer: "AIG" }
const louisiana = { id: "22", abbreviation: "LA", name: "Louisiana", icon: louisianaIcon, insurer: "Aetna" }
const maryland = { id: "24", abbreviation: "MD", name: "Maryland", icon: marylandIcon, insurer: "New York Life" }
const mississippi = { id: "28", abbreviation: "MS", name: "Mississippi", icon: mississippiIcon, insurer: "New York Life" }
const missouri = { id: "29", abbreviation: "MO", name: "Missouri", icon: missouriIcon, insurer: "Aetna" }
const northcarolina = { id: "37", abbreviation: "NC", name: "North Carolina", icon: northcarolinaIcon, insurer: "New York Life" }
const southcarolina = { id: "45", abbreviation: "SC", name: "South Carolina", icon: southcarolinaIcon, insurer: "New York Life" }
const tennessee = { id: "47", abbreviation: "TN", name: "Tennessee", icon: tennesseeIcon, insurer: "New York Life" }
const virginia = { id: "51", abbreviation: "VA", name: "Virginia", icon: virginiaIcon, insurer: "Baltimore Life Insurance" }

var states = [alabama, arkansas, georgia, kentucky, louisiana, maryland, mississippi, missouri, northcarolina, southcarolina
  , tennessee, virginia]

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
      soulsByOccupation: {},
      filter: 'insurer',
      loading: true,
      currentStateId: 0,
      currentState: {}
    }
    this.renderMap = this.renderMap.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.filterInsurers = this.filterInsurers.bind(this);
    this.getAllWearySouls = this.getAllWearySouls.bind(this);
    this.filterOutDuplicates = this.filterOutDuplicates.bind(this);
    this.appendAllSouls = this.appendAllSouls.bind(this);
    this.compareByInsurer = this.compareByInsurer.bind(this);
    this.configureButtons = this.configureButtons.bind(this);
    this.renderChartBar = this.renderChartBar.bind(this);
    this.setCurrentState = this.setCurrentState.bind(this);
  }
  componentDidMount() {
    this.init();
  }

  init() {
    this.getAllWearySouls();
    this.configureButtons();
  }

  configureButtons() {
    let ref = this;

    d3.selectAll('.legend-panel-insurer-button')
      .on('click', function () {
        // NOTE: DO NOT USE ARROW FUNCTION, LOSE CONTEXT OF THIS ,
        // https://stackoverflow.com/questions/48015265/errors-using-d3-legend-uncaught-typeerror-node-getattribute-is-not-a-functio
        d3.selectAll('.legend-panel-insurer-button').classed("active", false);
        d3.select(this).classed("active", !d3.select(this).classed("active"));
      })

    d3.selectAll('.legend-panel-filter-button')
      .on('click', function () {
        // NOTE: DO NOT USE ARROW FUNCTION, LOSE CONTEXT OF THIS ,
        // https://stackoverflow.com/questions/48015265/errors-using-d3-legend-uncaught-typeerror-node-getattribute-is-not-a-functio
        d3.selectAll('.legend-panel-filter-button').classed("active", false);
        d3.select(this).classed("active", !d3.select(this).classed("active"));
        d3.select('.insurers-map-wrapper').classed("filter-insurer", !d3.select(this).classed("filter-insurer"));
        var filter = d3.select(this).text();
        var filterAttr = filter.toLowerCase().toString()

        if (filterAttr === "insurer") {

          console.log("insurer")
          d3.select('#insurers-map-wrapper').classed("filter-industry", false);
          d3.select('#insurers-map-wrapper').classed("filter-insurer", true);
          ref.setState({ filter: "insurer" })
        } else if (filterAttr === "industry") {

          console.log("industry")
          d3.select('#insurers-map-wrapper').classed("filter-insurer", false);
          d3.select('#insurers-map-wrapper').classed("filter-industry", true);
          ref.setState({ filter: "industry" })
        }

      })
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
        ref.setState({ soulsByOccupation: ref.objectSoulsByOccupation(wearysouls) })
      })
      .then(function () {
        ref.setState({ loading: false });
        ref.renderMap();
        ref.renderChart();
        ref.renderChartBar();
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
    let width = 425,
      height = 400,
      minX = 450,
      minY = 175;

    let insurersMap = d3.select('#insurers-map-wrapper')
      .append('svg')
      .attr('class', 'insurers-map-svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', '' + minX + ' ' + minY + ' ' + width + ' ' + height + '')
      .append('g')
      .attr('class', 'map-contain');

    var path = d3.geoPath();
    d3.json("https://d3js.org/us-10m.v1.json", function (error, data) {
      if (error) throw error;
      let states = topojson.feature(data, data.objects.states).features;

      let stateIds = ['01', '05', '10', '12', '13', '17', '18', '19', '21', '22', '24', '28', '29', '34', '37', '39', '42', '45', '47', '51', '54'];
      let filteredStates = states.filter((state) => {
        return stateIds.includes(state.id);
      })

      let stateContainer = insurersMap.selectAll('state-container')
        .data(filteredStates)
        .enter()
        .append('g')
        .attr('class', 'state-container')
        .attr("container-stateId", (state) => {
          return state.id
        })

      // setup unknown locations
      let unknownLocationsDiv = d3.select('#insurers-map-wrapper')
        .append('div')
        .attr('class', 'unknown-locations')

      unknownLocationsDiv
        .append('svg')
        .attr('height', '175px')
        .attr('width', '175px')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', '0 -50 1 100')
        .attr('class', 'unknown-state-container')
        .append('g')
        // .style('transform', 'translate(50%, 50%)')
        .attr('class', 'unknown-grouping')
        .attr("container-stateId", "NL")

      unknownLocationsDiv
        .append('label')
        .text('Location Unknown')

      // add paths for each state
      stateContainer.append('path')
        .attr('class', 'state hover')
        .attr('stateId', (state) => {
          return state.id
        })
        .attr('state', (state) => {
          return 'state-' + state.id
        })
        .attr('d', path)
        .on('click', function (d) {
          var stateX, stateY;
          var centroid = path.centroid(d);
          var k = 3;
          stateX = centroid[0];
          stateY = centroid[1];
          var containerW = d3.select("#insurers-map-wrapper").node().getBoundingClientRect().width;
          var containerH = d3.select("#insurers-map-wrapper").node().getBoundingClientRect().height;

          var hasActiveState = d3.selectAll('.state-container .state').classed("active");
          console.log(hasActiveState);

          if (hasActiveState) {
            d3.select(".map-contain")
              .transition()
              .duration(750)
              .attr("transform", "translate(" + ((containerW / 2)) + "," + ((containerH / 2)) + ")scale(" + k + ")translate(" + -(stateX - 50) + "," + -stateY + ")")

            d3.selectAll('.state-container .state').classed("active", false);
            d3.select(this).classed("active", !d3.select(this).classed("active"));

            console.log("no states centered")
          } else {
            if (d3.select(this).classed('active')) {
              d3.select(".map-contain")
                .transition()
                .duration(750)
                .attr("transform", "translate(" + 0 + "," + 0 + ")scale(" + 1 + ")")

              d3.selectAll('.state-container .state').classed("active", false);
              console.log("current state centered")
              console.log(d.id);
              ref.setState({ currentStateId: -1 });
            } else {
              d3.selectAll('.state-container .state').classed("active", false);
              d3.select(this).classed("active", !d3.select(this).classed("active"));

              d3.select(".map-contain")
                .transition()
                .duration(750)
                .attr("transform", "translate(" + ((containerW / 2)) + "," + ((containerH / 2)) + ")scale(" + k + ")translate(" + -(stateX - 50) + "," + -stateY + ")")
              console.log("current state not centered")
              console.log(d.id);
              ref.setState({ currentStateId: d.id });
              ref.setCurrentState(ref.state.currentStateId)
              console.log(ref.state.currentStateId);

              //console.log(currentStateId);
              // Notes: each insurer, per state, percentage of insurerd workers per state population of workers on record that were insured, money they made
            }
          }
        })

      let obj = ref.state.soulsByStateId;

      // loop through all of the states and each soul to display a point for every soul
      let objCopy = Object.assign({}, obj);
      var keys = Object.keys(objCopy);
      ref.appendAllSouls(keys, path, obj);
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
      if (stateId === null || stateId === 'null') {
        stateId = 'NL';
        console.log("range:" + val.length);
        // set range to the number of unknown location slaves
        var unknownSlavesCircles = d3.packSiblings(d3.range(val.length).map(function (r) { return { r: 1.5 }; }));

        var size = Math.max('175px', '175px');

        d3.select('.unknown-state-container')
          .select("g")
          .selectAll("circle")
          .data(unknownSlavesCircles)
          .enter()
          .append("circle")
          // .style('fill', 'blue')
          .attr("class", "insurer-map-point")
          .attr("insurer", function (d, i) {
            if (typeof val[i - 1] != 'undefined') {
              return val[i - 1].insurancefirm
            }
          })
          .attr("r", function(d) { return d.r - 0.25; })
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
      } else {
        d3.select("[container-stateId='" + stateId + "']")
          .append('circle')
          .attr('class', 'pack')
          .attr('r', 1)
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
              return { r: 1.25 };
            }));
        var currentSoul;

        var punto = d3.select("[container-stateId='" + stateId + "']")
          .selectAll("circle")
          .data(circles)
          .enter()
          .append("circle")
          .attr("order", function (d, i) { currentSoul = val[i - 1]; return i })
          .attr("class", "insurer-map-point")
          .attr("name", function (d, i) { return val[i - 1].name })
          .attr("occupation", function (d, i) { return val[i - 1].occupation })
          .attr("owner", function (d, i) { return val[i - 1].owner })
          .attr("city", function (d, i) { return val[i - 1].city })
          .attr("insurer", function (d, i) { return val[i - 1].insurancefirm })
          .attr("stateId", function (d, i) { return val[i - 1].state_id })
          .attr("state", function (d, i) { return val[i - 1].state })
          .attr("r", function (d) { return d.r - 0.25; })
          .attr("cx", function (d) { return d.x + pathCX; })
          .attr("cy", function (d) { return d.y + pathCY; })
          .on('mouseover', function (d, i) {

            var name = d3.select(this).attr('name');
            var owner = d3.select(this).attr('owner');
            var city = d3.select(this).attr('city');
            var state = d3.select(this).attr('state');
            var occupation = d3.select(this).attr('occupation');
            var insurer = d3.select(this).attr('insurer');

            var tooltip = d3.select(".insurers-map-container")
              .append("div")
              .attr("class", "tooltip")
              .insert("div")
              .attr("class", "insurer-map-point-tooltip")

            tooltip.insert("span")
              .attr("class", "insurer-map-point-tooltip-name")
              .text(name ? name : "Unknown Name")

            tooltip.insert("span")
              .attr("class", "insurer-map-point-tooltip-location")
              .text(city ? city + ", " + state : state)

            tooltip.insert("label")
              .attr("class", "insurer-map-point-tooltip-owner-label")
              .text("Owner")

            tooltip.insert("span")
              .text(owner)

            tooltip.insert("label")
              .attr("class", "insurer-map-point-tooltip-occupation-label")
              .text("Occupation")

            tooltip.insert("span")
              .attr("class", "insurer-map-point-tooltip-occupation")
              .text(occupation)

            tooltip.insert("span")
              .attr("class", "insurer-map-point-tooltip-insurer")
              .attr("insurer", insurer)
              .text(insurer)
          })
          .on('mouseout', function () {
            d3.selectAll('.tooltip').remove();
          })
          .on('mousemove', function () {
            d3.select('.tooltip')
              .style("left", (d3.event.pageX < window.innerWidth - 200 ? d3.event.pageX + 20 : window.innerWidth - 200) + "px")
              .style("top", (d3.event.pageY + 20) + "px")
          })
      }
    }
  }

  renderChart() {
    let filteredInsurers = this.filterInsurers();
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
  renderChartBar() {
    // Industry Breakdown Chart Bar
    let obj = this.state.soulsByOccupation;
    var keys = Object.keys(obj);
    let total = 0;

    for (var i = 0; i < keys.length; i++) {
      var val = obj[keys[i]];
      if (keys[i] === "NL") {
        // do nothing
      } else {
        total += val.length;
      }
    }
    // assign a copy as to not mutate the original, then delete NL so that not listed
    // souls do not appear in the chart
    let objCopy = Object.assign({}, obj);
    delete objCopy.NL;

    // var x = d3.scaleLinear()
    //   .domain([0, total])
    //   .range([0, total]);

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

    chartBar.append("div")
      .attr("class", "industry-chart-bar-tooltip")

    // Set tooltip for showing data associated with a portion of the bar
    let tooltip = d3.selectAll(".industry-chart-bar-tooltip");

    tooltip.append("span")
      .attr("class", "industry-chart-bar-tooltip-occupation")
      .text((data) => data[0].occupation);

    tooltip.append("span")
      .attr("class", "industry-chart-bar-tooltip-record")
      .text((data) => data.length)
      .append("label")
      .attr("class", "industry-chart-bar-tooltip-record-label")
      .text("records");

    tooltip.append("span")
      .attr("class", "industry-chart-bar-tooltip-percentage")
      .text((data) => "%" + ((data.length / total) * 100).toFixed(1))
      .append("label")
      .attr("class", "industry-chart-bar-tooltip-percentage-label")
      .text("of workforce");
  }
  // UTILS
  setCurrentState(num) {
    let ref = this;
    for (var i = 0; i < states.length; i++) {
      if (num === states[i].id) {
        ref.setState({ currentState: states[i] })
        break;
      }
    }
  }

  render() {
    let industryChartBar = (
      <div className={this.state.filter === 'industry' ? "industry-chart-bar-container" : "industry-chart-bar-container hidden lowered"}>
        <small className="industry-chart-bar-title">Industry Breakdown</small>
        <div className="industry-chart-bar"></div>
        <div className="industr-char-bar-axis"></div>
      </div>
    )
    let insurerMapKey = (
      <div className={this.state.filter === 'insurer' ? "" : "hidden lowered"}>
        <InsurersMapKey />
      </div>
    )
    let currentStateId = this.state.currentStateId;
    let currentStateIdArray = states.map(function (state, idx) {
      return state.id;
    })
    const noRecordsAvailableState = (
      <div>
        <h4 className="color-warning">No records available</h4>
        <p>Looks like there are no records of insurers exploting slaves in this state</p>
        <i>Try clicking to another state to view more information</i>
      </div>
    )
    let recordsAvailableState = (
      <div>
        {this.state.currentState && <h2 className="interactive-info-panel-state-name">{this.state.currentState.name}</h2>}
  //      {this.state.currentState && <img className="interactive-info-panel-state-icon" src={this.state.currentState.icon} alt={this.state.currentState.name} />}
        <p>
          In {this.state.currentState.name} the biggest insurer of slaves in our records was insurance company: {this.state.currentState.insurer}
        </p>
        
      </div>
    )

    // Notes: each insurer, per state, percentage of insurerd workers per state population of workers on record that were insured, money they made
    let interactiveInfo = (
      <div className={this.state.currentStateId <= 0 ?
        (this.state.currentStateId === 0 ? 'interactive-info-panel onload' : 'interactive-info-panel slide-up') :
        ('interactive-info-panel slide-down')}>

        {currentStateIdArray.includes(this.state.currentStateId) ? recordsAvailableState : noRecordsAvailableState}

      </div>
    )

    return (
      <section className="insurers-map-container">
        <LegendPanel />
        {this.state.loading ? <Loading content="Map"/> : <InsurersMapView souls={this.state.statesNew} />}
        <SidePanel states={this.state.statesNew} namesByState={this.state.namesByState} />
        {insurerMapKey}
        {industryChartBar}
        {interactiveInfo}
      </section>
    );
  }
}

export default InsurersMap;
