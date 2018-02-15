import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import InsurersMap from './InsurersMap';
import Post from './Blog/Post';
import Posts from './Blog/Posts';

const Routes = () => {
    return (
    <Router>
        <div>
            <Route path="/" component={Home} exact />
            <Route path="/map" component={InsurersMap} exact />
            <Route exact path="/post" component={Posts}/>
            <Route exact path="/post/:slug/:_id" component={Post}/>
        </div>
    </Router>
    )
}

export default Routes;