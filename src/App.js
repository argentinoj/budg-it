import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {ManagementPage} from './components/ManagementPage';
import {HomePage} from './components/HomePage';
import {TransactionPage} from './components/TransactionPage'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = ({
      total_from_managment: 15000,
      percentage_from_managment: 0,
    });
    this.receiveTotal = this.receiveTotal.bind(this);
    this.receivePercentage = this.receivePercentage.bind(this);
  }


  receiveTotal(total){
    console.log("Total Received" + total)
    this.setState({total_from_managment: total})
  }

  receivePercentage(percentage){
    console.log("Percent Received" + percentage)

    this.setState({percentage_from_managment: percentage})
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path = "/" 
            render = {(props) => <HomePage 
              total_wallet_amount = {this.state.total_from_managment} 
              current_savings_percent = {this.state.percentage_from_managment}/>}
          />

          <Route path = "/mp" 
            render = {(props) => <ManagementPage 
              receiveTotal = {this.receiveTotal} 
              receivePercentage = {this.receivePercentage}/>}

            />

          <Route path = "/t"
            render = {(props) => <TransactionPage/>}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
