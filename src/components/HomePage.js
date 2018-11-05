import React, {Component} from 'react';
import {ManagementPage} from './ManagementPage.js'
import './HomePage.css';

export class HomePage extends Component{
    constructor(){
        super();
        this.current_savings_percent = 20,
        this.total_wallet_amount = 15000,
        this.state = ({
            wallet: ((100-this.current_savings_percent)/100 * this.total_wallet_amount),
            wallet_sign: "+",
        });
    }

    updateWalletSign = () => {
        if(this.state.wallet <= 0){
            this.setState({wallet_sign: '-'});
        }else{
            this.setState({wallet_sign: '+'});
        }
    }

    placeHolder = () => {
        console.log("Will Route To Management Page");
    }


    render(){
        return(
        <div className = "BackGround">
            <div className = "Head">budge.it</div>
            <div className = "Value">{this.state.wallet_sign}${this.state.wallet}</div>
            <div className = "Footer" onClick = {this.placeHolder}>∇</div>
        </div>
        );
    }
}
