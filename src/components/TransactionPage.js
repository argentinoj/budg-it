import React, {Component} from 'react';
import './TransactionPage.css';
import {TransactionItem} from './TransactionTracking';
import { Redirect } from "react-router";
import swal from 'sweetalert2'

export class TransactionPage extends Component {
    constructor() {
        super();
        this.state = ({
            value: 0, 
            positive: false, 
            name: "Transaction", 
            spontaneous: true,
            route_management: false,
            wallet: 0,
        });
        this.updateWallet = this.updateWallet.bind(this);

    }

    updateWallet(){
        this.setState({wallet: ( (100-this.props.current_savings_percent)/100 * this.props.total_wallet_amount)})
    }

    setPositive = () => {
        console.log("Positive")
        this.setState({positive: true})
    }

    setNegative = () => {
        console.log("Negative")
        this.setState({positive: false})
    }
    //amount name boolean zero

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

    sendTransaction = () => {
        if (!this.state.positive && this.state.wallet < this.state.value){
            swal({
                title: "Warning!",
                text: "You've used up all the money in your wallet.\nThis purchase will take money from your savings.",
                type: 'warning',
                confirmButtonText: "Confirm"
            })
        }
        
        console.log(this.state)
        var temp = 0;
        if(this.state.positive){
            temp = this.state.value;
        }else{
            temp = -1 *  this.state.value;
        }
        this.props.receiveTransaction(new TransactionItem(temp, this.state.name, this.state.positive, 0));
    }

    routeManagement = () => {
        this.sendTransaction();
        this.setState({route_Management: true});
    }

    render() {
        if (this.state.route_Management) {
            return <Redirect push to="/" />;
        }
        return (
            <div id="page">
                <div id="header">
                    <div>Transaction</div><input onChange = {this.setName} type = "text"></input>
                </div>
                <div className="input-group row justify-content-md-center row" id="transaction">
                    <form className="form-inline">
                        <span className="input-group col col-9" id="money">
                            <span className="input-group-prepend">
                                <span className="input-group-text">$</span>
                            </span>
                            <input onChange = {this.setValue} type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.value}>
                            </input>
                        </span>
                        <div className="btn-group btn-group-toggle col col-3" data-toggle="buttons" id="sign">
                            <label className="btn btn-success active" onClick={this.setPositive}>
                                +
                            </label>

                            <label className="btn btn-danger" onClick={this.setNegative}>   
                                -
                            </label>
                        </div>
                    </form>

                </div>
                <div id="regularity">

                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className="btn btn-primary active">
                            <input
                                type="radio"
                                name="repeated"
                                id="spontaneous"
                                autoComplete="off"
                                onChange={this.setPositive}
                                checked = {this.state.spontaneous}
                                onClick = {this.setSpontaneous}/>
                            Spontaneous
                        </label>

                        <label className="btn btn-primary">
                            <input
                                type="radio"
                                name="repeated"
                                id="regular"
                                autoComplete="off"
                                onChange={this.setNegative}
                                checked={!this.state.spontaneous}
                                onClick = {this.setRegular}/>
                            Regular
                        </label>
                    </div>
                </div>

                <button type="button" className="btn btn-primary" onClick = {this.routeManagement}>
                    Confirm
                </button>
            </div>
        );
    }
}