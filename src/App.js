import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {ManagementPage} from './components/ManagementPage';
import {HomePage} from './components/HomePage';
import {TransactionPage} from './components/TransactionPage'
import logo from './logo.svg';
import { TransactionItem } from './components/TransactionTracking';

import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = ({
      total_from_managment: 15000,
      percentage_from_managment: 0,
      transaction: [],
    });
    this.receiveTotal = this.receiveTotal.bind(this);
    this.receivePercentage = this.receivePercentage.bind(this);
    this.receiveTransaction = this.receiveTransaction.bind(this);
    
    
  }

  componentWillMount(){
    if(JSON.parse(localStorage.getItem("ls")) != null){
      var simplify = JSON.parse(localStorage.getItem("ls"));
      var tempStorage = []
      for(var i = 0; i < simplify.length; i++){
        var wrap = (simplify[i].state);
        tempStorage.push(new TransactionItem(wrap.amount, wrap.title, wrap.spontaneous, wrap.id));
      }
      this.setState({transaction: tempStorage});
    }
  }
  
  receiveTotal(total){
    //console.log("Total Received " + total)
    this.setState({total_from_managment: total})
  }

  receivePercentage(percentage){
    //console.log("Percent Received " + percentage)

    this.setState({percentage_from_managment: percentage})
  }

  receiveTransaction(transaction1){
    //console.log("Transaction Received " + transaction1)
    //console.log(transaction1)
    var temp = this.state.transaction;
    temp.push(transaction1);
    
    this.setState({transaction: temp});

    localStorage.setItem("ls", JSON.stringify(this.state.transaction)); 
  }

  resetPurchaseHistory(){
    localStorage.setItem("ls",null);
    this.setState({transaction: []});
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
              receivePercentage = {this.receivePercentage}
              transactions = {this.state.transaction}
              clearPurchaseHistory = {this.resetPurchaseHistory}
              />}

            />

          <Route path = "/t"
            render = {(props) => <TransactionPage
            receiveTransaction = {this.receiveTransaction}
            current_savings_percent = {this.state.percentage_from_managment}
            total_wallet_amount = {this.state.total_from_managment}/>}
            />
        </Switch>
      </Router>
    );
  }
}

export default App;
