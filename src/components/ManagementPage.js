import React, {Component} from 'react';
import { Redirect } from "react-router";
import './radial.js';
import './radial.css'
import './ManagementPage.css';
import swal from 'sweetalert2'
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
            tempw = tempw + Number(this.props.transactions[i].getAmount());
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

    clearHistory = () => {
        this.props.clearPurchaseHistory();
    }

    route = () => {
        this.props.receiveTotal(this.state.total_wallet_amount);
        this.props.receivePercentage(this.state.chosen_savings_threshold);
        this.setState({routeHome: true});
    }



    makeSuggestions = () => {
        var suggestion = "So far so good!"

        if (this.state.chosen_savings_threshold > 75) {
            suggestion = "You're saving " + this.state.chosen_savings_threshold + "% of your income. Consider lowering that."
        }
        else if (this.state.transactionList.length == 0){
            suggestion = "Try making some transactions to help us make suggestions."
        }
        else {
            var maxTransaction = 0;
            var maxTransactionIndex = 0;
            var transactions = this.state.transactionList;

            for (var i = 0; i < transactions.length; i++){
                if (Math.abs(transactions[i].getAmount()) > maxTransaction){
                    maxTransaction = Math.abs(transactions[i].getAmount());
                    maxTransactionIndex = i;
                }
            }
            if (maxTransaction >= 5000){
                suggestion = "You spent $" + maxTransaction + " on " + transactions[maxTransactionIndex].getTitle() + 
                ". Consider making smaller purchases in the future.";
            }
            else {
                var countObj = {};
                for (var i = 0; i < transactions.length; i++){
                    if (transactions[i].getAmount() < 0){
                        if (transactions[i].getTitle().toLowerCase() in countObj){
                            countObj[transactions[i].getTitle().toLowerCase()] = countObj[transactions[i].getTitle().toLowerCase()]
                             + Math.abs(transactions[i].getAmount());
                        } else {
                            countObj[transactions[i].getTitle().toLowerCase()] = Math.abs(transactions[i].getAmount());
                        }
                    }
                }
                console.log(countObj);
                var maxTalliedTotal = 0;
                var maxTalliedName = "";
                for (var i = 0; i < transactions.length; i++){
                    if (countObj[transactions[i].getTitle().toLowerCase()] > maxTalliedTotal){
                        maxTalliedTotal = countObj[transactions[i].getTitle().toLowerCase()];
                        maxTalliedName = transactions[i].getTitle().toLowerCase();
                    }
                }
                console.log(maxTalliedTotal);
                console.log(maxTalliedName);
                if (maxTalliedTotal >= 5000){
                    suggestion = "You spent " + maxTalliedTotal + " on multiple purchases of "+ maxTalliedName + ". Consider buying "+ 
                    "that item in less quantities.";
                }
                else{
                    var regularIncome = 0;
                    var regularPurchase = 0;
                    var spontaneousPurchase = 0;

                    for (var i = 0; i < transactions.length; i++){
                        if (!transactions[i].getSpontaneous()){
                            if (transactions[i].getAmount() > 0) regularIncome += transactions[i].getAmount();
                            else regularPurchase += transactions[i].getAmount();
                        }
                        else if (transactions[i].getAmount() < 0) spontaneousPurchase += transactions[i].getAmount();
                    }

                    regularIncome = Math.abs(regularIncome);
                    regularPurchase = Math.abs(regularPurchase);
                    spontaneousPurchase = Math.abs(spontaneousPurchase);

                    if (regularIncome < regularPurchase) suggestion = "You're spending more than you earn on a regular basis.";
                    else if (regularIncome < spontaneousPurchase) suggestion = "You're impulse buying more than you regularly earn.";
                }
            } 
        }

        swal({
            title: "Suggestion",
            text : suggestion,
            type: 'info',
            confirmButtonText: "Okay"
        })
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
                    <span align="left" style ={{color: "gray", marginRight: "10px"}}>History:</span>
                    <span><button id = "historyButton" className="btn btn-outline-secondary" onClick = {this.clearHistory}>Clear</button></span>
                    <span><button type="button" id = "historyButton" className="btn btn-outline-secondary" onClick = {this.makeSuggestions}>
                        Suggestion
                    </button></span>
                    <div align="left" style ={{color: "black"}}> {
                        this.state.transactionList.length > 0 ? (
                        this.state.transactionList.map((trans) => 
                            <li key = {trans.state.id} style={{color: trans.state.amount < 0 ? "red" : "green"}}>  
                                {trans.state.title + " | " + 
                                (trans.state.amount < 0 ? " - $" : " + $") + 
                                String(Math.abs(trans.state.amount)) + " | " +
                                (trans.state.spontaneous ? "Spontaneous" : "Regular")} 
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
