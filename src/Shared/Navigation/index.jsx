import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor';
import './styles/navigation.css';

class Navigation extends Component {
    render() {
        return (
            <nav>
                <Scrollchor to="intro">Intro</Scrollchor>
                <Scrollchor to="about">About</Scrollchor>
                <Scrollchor to="map">Map</Scrollchor>
                <Scrollchor to="blog">Blog</Scrollchor>
            </nav>
        )
    }
}

export default Navigation;