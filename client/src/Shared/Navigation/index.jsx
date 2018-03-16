import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor'; // TODO: Remove Scrollchor from dependencies
import { Link } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <aside className="navigation">
                <span className="navigation-line-break" />
                <nav>
                    <Link to="#intro">Intro</Link>
                    <Scrollchor to="#about">About</Scrollchor>
                    <Link to="/map">Map</Link>
                    <Link to="blog">Blog</Link>
                </nav>
                <a className="contribute">
                    <h6>Contribute to the Project</h6>
                </a>
            </aside>
        )
    }
}

export default Navigation;