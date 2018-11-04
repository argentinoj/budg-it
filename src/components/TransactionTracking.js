import React, {Component} from 'react';
import './TransactionTracking.css';

export class TransactionTracking extends Component{
    constructor(props){
        super(props);

        this.state = {
            
        }
        this.transactionList = [TransactionItem(1, "a", true, 0), TransactionItem(1, "a", false, 0)];
        this.render = this.render.bind(this);
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