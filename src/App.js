import React, { Component } from 'react';
import {IncomeOption} from './components/IncomeOption';
import {ManagementPage} from './components/ManagementPage';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ManagementPage></ManagementPage>
      </div>
    );
  }
}

export default App;
