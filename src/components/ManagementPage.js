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
        //state to hold member variables
        this.state = ({
            chosen_savings_threshold: 0,
            total_wallet_amount: 15000,
            savingsColor: "white",
            routeHome: false,
            transactionList: [],
            //example transaction item
            }) //[new TransactionItem(-30, "Food", true, 0), new TransactionItem(400, "Paycheck", false, 1)];

            //binding functions so that they can set the state properly
            this.addTransaction = this.addTransaction.bind(this);
            this.updateTransactionList = this.updateTransactionList.bind(this);
    }

    //function to run every time the component parent state changes
    componentWillMount(){
        this.updateTransactionList();
        this.setState({chosen_savings_threshold: localStorage.getItem("hi")})
    }

    //Updates the transaction list to be displayed when it recieves a new transaction
    updateTransactionList = () => {
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

    //Sets the threshold to the users specification
    setThreshold = (e) => {
        this.setState({savingsColor: "white"});
        this.setState({chosen_savings_threshold: e.target.value});
    }

    //adds a transaction
    addTransaction = (t) => {
        // takes in a transactionitem, and appends it to the transaction list
        this.setState({transactionList: this.state.transactionList.push(t)});
    }

    //clears the purchase history in this current class and the parent class
    clearHistory = () => {
        this.props.clearPurchaseHistory();
    }

    //Adds ability to route home and it also passes the correct values to the parent class
    route = () => {
        this.props.receiveTotal(this.state.total_wallet_amount);
        this.props.receivePercentage(this.state.chosen_savings_threshold);
        this.setState({routeHome: true});
    }


    //Big Boy function that creates smart suggestions on your spending habbits
    makeSuggestions = () => {
        //sugestion is a string that gets modified as to hold the most important suggestion
        var suggestion = "So far so good!"

        //Should not save more than 75 percent or you will have no spending money
        if (this.state.chosen_savings_threshold > 75) {
            suggestion = "You're saving " + this.state.chosen_savings_threshold + "% of your income. Consider lowering that."
        }//have to make transactions for the suggestions to work
        else if(this.state.transactionList.length == 0){
            suggestion = "Try making some transactions to help us make suggestions."
        }
        else {//Next suggestion that tests for abnormally large purchases
            var maxTransaction = 0;
            var maxTransactionIndex = 0;
            var transactions = this.state.transactionList;

            for(var i = 0; i < transactions.length; i++){
                if(Math.abs(transactions[i].getAmount()) > maxTransaction){
                    maxTransaction = Math.abs(transactions[i].getAmount());
                    maxTransactionIndex = i;
                }
            }
            if(maxTransaction >= 5000){
                suggestion = "You spent $" + maxTransaction + " on " + transactions[maxTransactionIndex].getTitle() + 
                ". Consider making smaller purchases in the future.";
            }
            else{ //Next suggestion that tests for spending too much on any one item
                var countObj = {};
                //get the total spent for each item
                for(var i = 0; i < transactions.length; i++){
                    if(transactions[i].getAmount() < 0){
                        if(transactions[i].getTitle().toLowerCase() in countObj){
                            countObj[transactions[i].getTitle().toLowerCase()] = countObj[transactions[i].getTitle().toLowerCase()] + Math.abs(transactions[i].getAmount());
                        }else{
                            countObj[transactions[i].getTitle().toLowerCase()] = Math.abs(transactions[i].getAmount());
                        }
                    }
                }
                //Find the item that you spent the most on
                var maxTalliedTotal = 0;
                var maxTalliedName = "";
                for(var i = 0; i < transactions.length; i++){
                    if(countObj[transactions[i].getTitle().toLowerCase()] > maxTalliedTotal){
                        maxTalliedTotal = countObj[transactions[i].getTitle().toLowerCase()];
                        maxTalliedName = transactions[i].getTitle().toLowerCase();
                    }
                }
                //test that max and make sure you decrease that for the future
                if(maxTalliedTotal >= 5000){
                    suggestion = "You spent " + maxTalliedTotal + " on multiple purchases of "+ maxTalliedName + ". Consider buying "+ 
                    "that item in less quantities.";
                }
                else{
                    //Final suggestion to test for spontaneous and regular purhcases and deposits
                    var regularIncome = 0;
                    var regularPurchase = 0;
                    var spontaneousPurchase = 0;
                    //get totals for each of these values
                    for(var i = 0; i < transactions.length; i++){
                        if(!transactions[i].getSpontaneous()){
                            if(transactions[i].getAmount() > 0)
                                regularIncome += transactions[i].getAmount();
                            else regularPurchase += transactions[i].getAmount();
                        }
                        else if (transactions[i].getAmount() < 0) 
                            spontaneousPurchase += transactions[i].getAmount();
                    }
                    //make sure we use the absolute value to remove any negatives
                    regularIncome = Math.abs(regularIncome);
                    regularPurchase = Math.abs(regularPurchase);
                    spontaneousPurchase = Math.abs(spontaneousPurchase);
                    //Test them against one another and make the proper suggestion
                    if(regularIncome < regularPurchase) suggestion = "You're spending more than you earn on a regular basis.";
                    else if (regularIncome < spontaneousPurchase) suggestion = "You're impulse buying more than you regularly earn.";
                }
            } 
        }
        //Modal that shows the suggestion when the button is clicked
        swal({
            title: "Suggestion",
            text : suggestion,
            type: 'info',
            confirmButtonText: "Okay"
        })
    }
    //render function to render the components
    render(){
        //local storage to save items
        localStorage.setItem("hi", this.state.chosen_savings_threshold)
        //appropriate routing
        if (this.state.routeHome) {
            return <Redirect push to="/" />;
        }
        //return the html
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
                
                {/* Shows the savings percentage and the radial bar */}
                <div class="form-group">
                    <label for="formControlRange">Enter Savings Percentage: {this.state.chosen_savings_threshold} %</label>
                    <input onChange = {this.setThreshold} type="range" defaultValue = {this.state.chosen_savings_threshold} max = "100" class="form-control-range" id="formControlRange"></input>   
                </div>

                {/* Shows the history table */}
                <div class="TransactionTable">
                    <span align="left" style ={{color: "gray", marginRight: "10px"}}>History:</span>
                    <span><button id = "historyButton" className="btn btn-outline-secondary" onClick = {this.clearHistory}>Clear</button></span>
                    <span><button type="button" id = "historyButton" className="btn btn-outline-secondary" onClick = {this.makeSuggestions}>
                        Suggestion
                    </button></span>
                    {/* Mapping trans to every item in the list and displaying it */}
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
