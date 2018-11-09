import React, {Component} from 'react';
import './TransactionPage.css';
import {TransactionItem} from './TransactionTracking';
import { Redirect } from "react-router";

export class TransactionPage extends Component {
    constructor() {
        super();
        this.state = ({
            value: 0, 
            positive: false, 
            name: "Transaction", 
            spontaneous: true,
            route_management: false,
        });
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
        console.log(this.state)
        var temp = 0;
        if(this.state.positive){
            temp = this.state.value;
        }else{
            temp = 0 - this.state.value;
        }
        this.props.receiveTransaction(new TransactionItem(temp, this.state.name, this.state.positive, 0));
    }

    routeManagement = () => {
        this.sendTransaction();
        this.setState({route_Management: true});
    }

    render() {
        if (this.state.route_Management) {
            return <Redirect push to="/mp" />;
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
                            <input onChange = {this.setValue} type="number" className="form-control" aria-label="Amount (to the nearest dollar)">
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
                                checked={!this.state.spontaneous}
                                onClick = {this.setRegular}/>
                            Regular
                        </label>
                    </div>
                </div>

                <button type="button" className="btn btn-primary" onClick = {this.routeManagement}>
                    Confirm
                </button>

                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#redAlert">
                    Launch demo modal
                </button>

                <div className="modal fade" id="redAlert" tabindex="-1" role="dialog" aria-labelledby="redAlertLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="redAlertLabel">Warning</h5>
                            </div>
                            <div className="modal-body">
                                <p>
                                    This purchase exceeds your wallet's balance. 
                                    <br/>
                                    Money will be drawn from your savings.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}