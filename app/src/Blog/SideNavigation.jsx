import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavigation.css';

const SideNavigation = () => (
    <nav className="side-navigation">
        <NavLink exact to="/" activeClassName="selected" >About</NavLink>
        <NavLink exact to="/map" activeClassName="selected" >Map</NavLink>
        <NavLink exact to="/post" activeClassName="selected" >Blog</NavLink>
    </nav>
)

export default SideNavigation;