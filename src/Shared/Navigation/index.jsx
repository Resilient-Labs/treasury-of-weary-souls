import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor';
import './Navigation.css';

class Navigation extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <aside>
                <span className="navigation-line-break" />
                <nav>
                    <Scrollchor to="intro">Intro</Scrollchor>
                    <Scrollchor to="about">About</Scrollchor>
                    <Scrollchor to="map">Map</Scrollchor>
                    <Scrollchor to="blog">Blog</Scrollchor>
                </nav>
                <a className="contribute">
                    <h6>Contribute to the Project</h6>
                </a>
            </aside>
        )
    }
}

export default Navigation;