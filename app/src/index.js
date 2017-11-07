import React from 'react';
import ReactDOM from 'react-dom';
import './Shared/styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />
, document.getElementById('root'));
registerServiceWorker();
