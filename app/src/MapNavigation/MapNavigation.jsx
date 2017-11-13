import React from 'react';
import { Link } from 'react-router-dom';

const MapNavigation = () => {
    return (
    <nav className="map-navigation">
        <Link to="map">Insurers By Region</Link>
        <Link to="industry">Slaves & Industry</Link>
    </nav>
    )
}

export default MapNavigation;