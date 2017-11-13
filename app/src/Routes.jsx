import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import InsurersMap from './InsurersMap';
import IndustryChart from './IndustryChart';
import Blog from './Blog';

const Routes = () => {
    return (
    <Router>
        <div>
            <Route path="/" component={Home} exact />
            <Route path="/map" component={InsurersMap} exact />
            <Route path="/industry" component={IndustryChart} exact />
            <Route path="/blog" component={Blog} exact/>
        </div>
    </Router>
    )
}

const Chart = () => {
    return (
        <h2>Chart</h2>
    )
}

export default Routes;