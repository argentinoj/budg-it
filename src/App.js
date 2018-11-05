import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {ManagementPage} from './components/ManagementPage';
import {HomePage} from './components/HomePage';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path = "/" component = {HomePage}/>
          <Route path = "/mp" component = {ManagementPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
