import React, {Component} from 'react';
import { Redirect } from "react-router";
import './radial.js';
import './radial.css'
import './ManagementPage.css';
import { TransactionItem } from './TransactionTracking';

export class ManagementPage extends Component{
    constructor(){
        super();
        this.state = ({
            chosen_savings_threshold: 0,
            total_wallet_amount: 15000,
            savingsColor: "white",
            routeHome: false,
            transactionList: [],

            }) //[new TransactionItem(-30, "Food", true, 0), new TransactionItem(400, "Paycheck", false, 1)];


            this.addTransaction = this.addTransaction.bind(this);
            this.updateTransactionList = this.updateTransactionList.bind(this);
    }

    componentWillMount(){
        this.updateTransactionList();
        this.setState({chosen_savings_threshold: localStorage.getItem("hi")})
    }

    updateTransactionList = () => {
        //this.setState({transactionList: this.props.transactions});
        console.log("mngmt")
        console.log(this.props.transactions);
        var temp = this.state.transactionList;
        var tempw = this.state.total_wallet_amount;
        for(var i = 0; i < this.props.transactions.length; ++i){
            temp.push(this.props.transactions[i]);
            tempw = tempw + this.props.transactions[i].getAmount();
        }

        this.setState({total_wallet_amount: tempw});
        this.setState({transactionList: temp});
    }

    setThreshold = (e) => {
        this.setState({savingsColor: "white"});
        this.setState({chosen_savings_threshold: e.target.value});
    }

    addTransaction = (t) => {
        // takes in a transactionitem, and appends it to the transaction list
        this.setState({transactionList: this.state.transactionList.push(t)});
    }

    route = () => {
        this.props.receiveTotal(this.state.total_wallet_amount);
        this.props.receivePercentage(this.state.chosen_savings_threshold);
        this.setState({routeHome: true});
    }

    render(){

        localStorage.setItem("hi", this.state.chosen_savings_threshold)

        if (this.state.routeHome) {
            return <Redirect push to="/" />;
        }

        return(
        <div className = "Page">
            <div className = "doneButton" onClick = {this.route}>≡</div>
            <div className = "yourSavings">Your Savings</div>
            <div>
                <div class="big">
                    <div class="pie pie--value pie--disc" style={{"--percent":this.state.chosen_savings_threshold,"--amount":(this.state.chosen_savings_threshold/100 * this.state.total_wallet_amount)}}></div>
                </div>
            </div>
            <form>
                <div class="form-group">
                    <label for="formControlRange">Enter Savings Percentage: {this.state.chosen_savings_threshold} %</label>
                    <input onChange = {this.setThreshold} type="range" defaultValue = {this.state.chosen_savings_threshold} max = "100" class="form-control-range" id="formControlRange"></input>   
                </div>

                <div class="TransactionTable">
                    <div align="left" style ={{color: "gray"}}>History:</div>
                    <div align="left" style ={{color: "black"}}> {
                        this.state.transactionList.length > 0 ? (
                        this.state.transactionList.map((trans) => 
                            <li key = {trans.state.id} style={{color: trans.state.amount < 0 ? "red" : "blue"}}>  
                                {trans.state.title + " | " + 
                                (trans.state.amount < 0 ? " - $" : " + $") + 
                                String(Math.abs(trans.state.amount)) + " | " +
                                (trans.state.spontaneous ? "Regular" : "Spontaneous")} 
                            </li>
                            )
                        ):(<div></div>)
                        } 
                    </div>
                </div> 
            </form>
            

        </div>
        );
    }
}
