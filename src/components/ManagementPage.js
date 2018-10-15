import React, {Component} from 'react';
import './ManagementPage.css';

export class ManagementPage extends Component{
    constructor(){
        super();
        this.state = ({
            chosen_savings_threshold: 0,
            total_wallet_amount: 15000,
            savingsColor: "red",
            })
    }

    setThreshold = (e) => {
        this.setState({savingsColor: "green"});
        this.setState({chosen_savings_threshold: e.target.value});
    }

    render(){
        return(
        <div>
            <div>Rest of this to be implemented by Cole</div>
            <form>
                <div class="form-group">
                    <label for="formControlRange">Enter Savings Percentage: {this.state.chosen_savings_threshold} %</label>
                    <input onChange = {this.setThreshold} type="range" defaultValue = "0" max = "100" class="form-control-range" id="formControlRange"></input>
                    
                    <div className = "SavingsDisplay">
                        <div>Savings</div>
                        <div style = {{color: this.state.savingsColor}} >
                            $ {Number(this.state.chosen_savings_threshold/100 * this.state.total_wallet_amount).toFixed(0)}
                        </div>
                    </div>
                </div>
            </form>

        </div>
        );
    }
}