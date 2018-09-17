import React, { Component } from 'react';
import {IncomeOption} from './components/IncomeOption';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Budg-it</h1>
        </header>
        <div className="App-intro">
          <IncomeOption>></IncomeOption>
          <IncomeOption></IncomeOption>
        </div>
      </div>
    );
  }
}

export default App;
