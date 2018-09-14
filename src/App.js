import React, { Component } from 'react';
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
          To get started, follow the instructions below.
          <br></br>
          <div>
            <label>Salary/Income</label>
          </div>
          <div>
            <select name="salaray">
              <option value="Dirt Poor">Dirt Poor</option>
              <option value="Student">Student</option>
              <option value="Middle Class">Middle Class</option>
              <option value="Jeff Bezos (CEO of Amazon)">Jeff Bezos (CEO of Amazon)</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
