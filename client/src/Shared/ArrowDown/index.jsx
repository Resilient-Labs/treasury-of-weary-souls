import React, { Component } from 'react';
import './ArrowDown.css';

class ArrowDown extends Component {
    render() {
        return (
            <svg className="arrow-down arrow-down--scaled">
                <path className="a1" d="M10 10 L15 16 L20 10"></path>
                <path className="a2" d="M5 15 L15 26 L25 15"></path>
                <path className="a3" d="M0 20 L15 36 L30 20"></path>
            </svg>
        )
    }
}

export default ArrowDown;