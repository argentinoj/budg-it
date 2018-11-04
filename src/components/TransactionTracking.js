import React, {Component} from 'react';
import './TransactionTracking.css';

export class TransactionTracking extends Component{
    constructor(props){
        super(props);

        this.state = {
            
        }
        this.transactionList = [];
        
    }

    addTransaction(tran){
        this.transactionList.push(tran);
    }

    render(){
        return(
            <div>
                <ol>
                    <li>History:</li>
                    <li> {this.transactionList.map((trans) => <Item key = {trans.id} item={trans.title + " | " + String(trans.amount) + " | " + (trans.spontaneous ? "Spontaneous" : "Periodic")} />)} </li>
                </ol>
            </div>
        );
    }

};

export class TransactionItem{
    constructor(_amount, _title, _spontaneous, _id){

        this.state = ({
            amount: 100,
            title: "food",
            spontaneous: true,
            id: _id
        });
        
    }




};