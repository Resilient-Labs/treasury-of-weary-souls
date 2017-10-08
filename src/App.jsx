import React, { Component } from 'react';
import './Components/shared/styles/App.css';
import Landing from './Components/Landing';
import About from './Components/About';
import Map from './Components/Map';
import Blog from './Components/Blog';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing />
        <About />
        <Map />
        <Blog />
      </div>
    );
  }
}

export default App;
