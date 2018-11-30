import React, {Component} from 'react';
import './TransactionPage.css';
import {TransactionItem} from './TransactionTracking';
import { Redirect } from "react-router";
import swal from 'sweetalert2'

export class TransactionPage extends Component {
    constructor() {
        super();
        //proper member variables
        this.state = ({
            value: 0, 
            positive: false, 
            name: "Transaction", 
            spontaneous: true,
            route_management: false,
            wallet: 0,
        });
        //bind function for state setting
        this.updateWallet = this.updateWallet.bind(this);
    }

    //built in function to run when the parent state changes
    componentWillMount(){
        this.updateWallet();
    }

    //updates the spendable amount from the homepage
    updateWallet(){
        this.setState({wallet: ( (100-this.props.current_savings_percent)/100 * this.props.total_wallet_amount)})
    }

    //FOR ALL BELOW FUNCTIONS
    //These functions get run every time you press a button to simply set member variables
    //No further commenting is needed
    setPositive = () => {
        this.setState({positive: true})
    }

    setNegative = () => {
        this.setState({positive: false})
    }

    setValue = (e) => {
        this.setState({value: e.target.value})
    }

    setName = (e) => {
        this.setState({name: e.target.value})
    }

    setSpontaneous = () => {
        this.setState({spontaneous: true})
    }

    setRegular = () => {
        this.setState({spontaneous: false})
    }

    //Send the transaction to the parent class
    sendTransaction = () => {   
        var temp = 0;
        if(this.state.positive){
            temp = this.state.value;
        }else{
            temp = -1 *  this.state.value;
        }
        this.props.receiveTransaction(new TransactionItem(temp, this.state.name, this.state.spontaneous, 0));
    }

    //manage routing as well as empty wallet checks to make sure you don't spend over your alotted limit
    routeManagement = () => {
        if (!this.state.positive && this.state.wallet < this.state.value){
            swal({
                title: "Warning!",
                text: "You've used up all the money in your wallet.\nThis purchase will take money from your savings.",
                type: 'warning',
                confirmButtonText: "Confirm"
            })
        }
        this.sendTransaction();
        this.setState({route_Management: true});
    }

    render() {
        //routing applied if you want to switch pages
        if (this.state.route_Management) {
            return <Redirect push to="/mp" />;
        }
        return (
            <div id="page">
                <div id="header">
                {/* input for the transaction name */}
                    <input onChange = {this.setName} type = "text" defaultValue="Transaction"></input>
                </div>
                <div className="input-group row justify-content-md-center row" id="transaction">
                    <form className="form-inline">

                        <span className="input-group col col-9" id="money">
                            <span className="input-group-prepend">
                                <span className="input-group-text">$</span>
                            </span>
                            <input 
                                onChange = {this.setValue} 
                                type="number" 
                                className="form-control"
                                aria-label="Amount (to the nearest dollar)" 
                                min="0"
                                value={this.state.value}/>
                        </span>
                    {/* Input buttons for + and - signs */}
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <button type='button' 
                                    className="btn btn-success active" 
                                    name="sign" 
                                    id="positive" 
                                    autoComplete="off" 
                                    checked={this.state.positive} 
                                    onClick={this.setPositive}>
                                    +
                                </button>

                            <button type='button' 
                                className="btn btn-danger" 
                                name="sign" 
                                id="negative" 
                                autoComplete="off" 
                                checked={!this.state.positive} 
                                onClick={this.setNegative}>
                                -
                            </button>
                        </div>
                    </form>
                </div>

                <div className="input-group row justify-content-md-center row" id="regularity">

                    <form className="form-inline">
                {/* Input buttons for spontaneous vs regular */}
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <button type='button' 
                                className="btn btn-primary active" 
                                name="regularity" 
                                id="spontaneous" 
                                autoComplete="off" 
                                checked={this.state.spontaneous} 
                                onClick={this.setSpontaneous}>
                                Spontaneous
                            </button>

                            <button type='button' 
                                className="btn btn-primary" 
                                name="regularity" 
                                id="regular" 
                                autoComplete="off" 
                                checked={!this.state.spontaneous} 
                                onClick={this.setRegular}>
                                Regular
                            </button>
                        </div>
                    </form>
                </div>

                <br/>

                <button type="button" className="btn btn-primary" onClick = {this.routeManagement}>
                    Confirm
                </button>
            </div>
        );
    }
}