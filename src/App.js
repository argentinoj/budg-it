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
      total_amount_managment: 0,
    });
    this.setTotalAmount = this.setTotalAmount.bind(this);
  }

  setTotalAmount(t_Amount){
    this.setState({total_amount_managment: t_Amount});
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path = "/" 
            render = {(props) => <HomePage/>}/>

          <Route path = "/mp" 
            render = {(props) => <ManagementPage/>}/>

          <Route path = "/t"
            render = {(props) => <TransactionPage/>}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
