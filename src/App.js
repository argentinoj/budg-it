import React, { Component } from 'react';
import {IncomeOption} from './components/IncomeOption';
import {HomePage} from './components/HomePage';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage className = "HomePage"></HomePage>
      </div>
    );
  }
}

export default App;
