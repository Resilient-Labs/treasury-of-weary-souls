import React from 'react';
import ReactDOM from 'react-dom';
import './Shared/styles/index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';


if (prompt("Please enter your name:") == "HireResilientCoders") {
ReactDOM.render(

<Routes />
, document.getElementById('root'));
registerServiceWorker();

} else {
    ReactDOM.render(
        
    <div>Not Allowed, please contact <a href="mailto:dev@resilientcoders.org">Admin</a> for support.</div>
    , document.getElementById('root'));
    registerServiceWorker();
}
// Uncomment below and comment above during development
// ReactDOM.render(
    
// <Routes />
// , document.getElementById('root'));
// registerServiceWorker();
