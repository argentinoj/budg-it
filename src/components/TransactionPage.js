import React, {Component} from 'react';
import './TransactionPage.css';

export class TransactionPage extends Component {
    constructor() {
        super();
        this.state = ({
            value: 0,
            positive = false,
            name: "Transaction",
            spontaneous: true
        });
    }

    setPositive = (positive) => {
        state.positive = positive
    }

    render() {
        return (
            <div className="page">
                <div className="header">
                    ∇
                    <br/>
                    ${this.state.name}
                </div>
                <div className="transaction">
                    <form>
                        <button type="button" onClick ={this.setPositive(true)}>+</button>
                        <button type="button" onClick={this.setPositive(false)}>-</button>

                        <input type="number" defaultValue="0"></input>
                    </form>

                </div>
                <div className="regularity">

                    <button type="button">
                        Spontaneous
                    </button>
                </div>

                <button type="button">
                    Confirm
                </button>
            </div>
        );
    }
}