import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let storage = window.localStorage;

ReactDOM.render(<App storage={storage} />, document.getElementById('root'));
registerServiceWorker();
