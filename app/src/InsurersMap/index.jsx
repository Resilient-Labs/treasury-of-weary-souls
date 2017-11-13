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

      function compareByInsurer(a, b) {
        if (a.insurancefirm < b.insurancefirm)
          return -1;
        if (a.insurancefirm > b.insurancefirm)
          return 1;
        return 0;
      }
      let obj = ref.state.soulsByStateId;

      // loop through all of the states and each soul to display a point for every soul
      let count = 0;
      let objCopy = Object.assign({}, obj);
      var keys = Object.keys(objCopy);
      for (var i = 0; i < keys.length; i++) {
        var val = obj[keys[i]];
        var stateId = keys[i];
        val.sort(compareByInsurer);
        for (var m = 0; m < val.length; m++) {
          count++
          let currentSoul = val[m];
          let location = currentSoul.city + ", " + stateId;

          if (stateId == null) {
            // do nothing 
          } else {
            d3.select("[container-stateId='" + stateId + "']")
              .append("circle")
              .attr("class", "insurer-map-point")
              .attr("name", currentSoul.name)
              .attr("occupation", currentSoul.occupation)
              .attr("owner", currentSoul.owner)
              .attr("location", location)
              .attr("city", currentSoul.city)
              .attr("stateId", currentSoul.state_id)
              .attr("insurer", currentSoul.insurancefirm)
              .attr("r", 2)
              .attr("cx", (d) => {
                return path.centroid(d)[0];
              })
              .attr("cy", (d) => {
                return path.centroid(d)[1];
              })
              //.append("div")
              //.attr("class", "industry-chart-view-tooltip")
          }
        }
      }
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
      .style("height",  (data) => { 
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