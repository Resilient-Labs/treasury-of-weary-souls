import React, { Component } from 'react';
import './Shared/styles/App.css';
import Intro from './Layouts/Intro';
import About from './Layouts/About';
import Blog from './Layouts/Blog';
import Map from './Maps';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Intro />
        <About />
        <Map />
        <Blog />
      </div>
    );
  }
}

export default App;
