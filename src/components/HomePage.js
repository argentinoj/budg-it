import React, {Component} from 'react';
import { Redirect } from "react-router";
import './HomePage.css';

export class HomePage extends Component{
    constructor(){
        super();
        
        this.state = ({
            current_savings_percent: 0,
            total_wallet_amount: 15000,
            wallet: 15000,
            wallet_sign: "+",
            redirect: false,
            routeToManagement: false,
        });

        this.updateWallet = this.updateWallet.bind(this);
    }

    componentWillMount(){
        this.updateWallet();
    }

    updateWallet(){
        this.setState({wallet: ( (100-this.props.current_savings_percent)/100 * this.props.total_wallet_amount)})
    }

    updateWalletSign = () => {
        if(this.state.wallet <= 0){
            this.setState({wallet_sign: '-'});
        }else{
            this.setState({wallet_sign: '+'});
        }
    }

    routeToTransaction = () => {
        console.log("Will Route To Management Page");
        this.setState({redirect: true})
    }

    routeToManagement = () => {
        this.setState({routeToManagement: true})
    }

    render(){
        if (this.state.redirect) {
            return <Redirect push to="/t" />;
          }
        if (this.state.routeToManagement) {
            return <Redirect push to="/mp" />;
        }
        
        return(
        <div className = "BackGround">
            <span className = "Menu" onClick = {this.routeToManagement}>≡  </span>
            <span className = "Head">budge.it</span>
            <div className = "Value">{this.state.wallet_sign}${this.state.wallet}</div>
            <div className = "Footer" onClick = {this.routeToTransaction}>∇</div>
        </div>
        );
    }
}
