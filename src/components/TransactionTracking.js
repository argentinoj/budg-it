import React, {Component} from 'react';
import './TransactionTracking.css';
/*
export class TransactionTracking extends Component{
    constructor(props){
        super(props);

        this.state = {
            
        }
        this.transactionList = [TransactionItem(1, "a", true, 0), TransactionItem(1, "a", false, 0)];
    }

    addTransaction(tran){
        this.transactionList.push(tran);
    }

    render(){
        return(
            <div>
                <ol>
                    <li>History:</li>
                    <li> {this.transactionList.map((trans) => <li key = {trans.id} item={trans.title + " | " + String(trans.amount) + " | " + (trans.spontaneous ? "Spontaneous" : "Periodic")} />)} </li>
                </ol>
            </div>
        );
    }

};*/

export class TransactionItem{
    constructor(_amount, _title, _spontaneous, _id){

        this.state = ({
            amount: _amount,
            title: _title,
            spontaneous: _spontaneous,
            id: _id,
        });

    }
    
    getAmount(){
        return this.state.amount;
    }

    getTitle(){
        return this.state.title;
    }

    getSpontaneous(){
        return this.state.spontaneous;
    }
};