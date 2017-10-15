import React, { Component } from 'react';
import './Components/shared/styles/App.css';
import Intro from './Layouts/Intro';
import About from './Layouts/About';
import Blog from './Layouts/Blog';
import Map from './Maps';
import Navigation from './Shared/Navigation';

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
