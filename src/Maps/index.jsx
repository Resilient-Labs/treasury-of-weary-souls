import React, { Component } from 'react';
import HeatMapView from './Components/HeatMap/HeatMapView';
import SidePanel from './Components/SidePanel/SidePanel'
import './styles/Maps.css';

class Map extends Component {
  render() {
    return (
      <section className="map-container" id="map">
          <HeatMapView />
          <SidePanel />
      </section>
    );
  }
}

export default Map;