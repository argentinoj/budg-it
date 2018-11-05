import React, {Component} from 'react';
import { Redirect } from "react-router";
import './radial.js';
import './radial.css'
import './ManagementPage.css';

export class ManagementPage extends Component{
    constructor(){
        super();
        this.state = ({
            chosen_savings_threshold: 0,
            total_wallet_amount: 15000,
            savingsColor: "white",
            routeHome: false,
            })
    }

    setThreshold = (e) => {
        this.setState({savingsColor: "white"});
        this.setState({chosen_savings_threshold: e.target.value});
    }

    route = () => {
        this.setState({routeHome: true})
    }

    render(){
        if (this.state.routeHome) {
            return <Redirect push to="/" />;
          }
        return(
        <div>
            <div className = "doneButton" onClick = {this.route}>DONE</div>
            <div>
                <div class="big">
                    <div class="pie pie--value pie--disc" style={{"--percent":this.state.chosen_savings_threshold,"--amount":(this.state.chosen_savings_threshold/100 * this.state.total_wallet_amount)}}></div>
                </div>
            </div>
            <form>
                <div class="form-group">
                    <label for="formControlRange">Enter Savings Percentage: {this.state.chosen_savings_threshold} %</label>
                    <input onChange = {this.setThreshold} type="range" defaultValue = "0" max = "100" class="form-control-range" id="formControlRange"></input>
                </div>
            </form>

        </div>
        );
    }
}
