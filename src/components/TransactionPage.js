import React, {Component} from 'react';
import './TransactionPage.css';

export class TransactionPage extends Component{
    constructor(){
        super();
        this.state = ({
            value: 0,
            positive = false,
            name: "",
            spontaneous: true
        });
    }

    render(){
        return(
            <div className = "page">
                <div className = "header">
                ∇
                <br/>
                ${this.state.name}
                </div>
                <div className = "transaction">

                </div>
                <div className = "regularity">

                </div>
            </div>
        );
    }
}