import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//initial class that gets the root dom and renders the App component within it
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
