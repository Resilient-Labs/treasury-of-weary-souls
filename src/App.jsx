import React, { Component } from 'react';
import './Components/shared/styles/App.css';
import Intro from './Components/Intro';
import About from './Components/About';
import Map from './Components/Map';
import Blog from './Components/Blog';
import Navigation from './Components/shared/navigation/navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Intro />
        <About />
        <Map />
        <Blog />
      </div>
    );
  }
}

export default App;
