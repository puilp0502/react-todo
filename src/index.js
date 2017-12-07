import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let todos = [
    {"text": "Get Awesome", "done": false},
    {"text": "Learn React", "done": true}
];
ReactDOM.render(<App todos={todos} />, document.getElementById('root'));
registerServiceWorker();
