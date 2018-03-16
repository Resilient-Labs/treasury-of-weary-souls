import React from 'react';
import './Loading.css';

const Loading = props => {
    return (
        <div className="loading-container">
            <div className="loading"/>
            <p className="loading-text">Loading {props.content}...</p>
        </div>
    )
}

export default Loading;