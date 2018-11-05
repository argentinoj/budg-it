import React, {Component} from 'react';
import './TransactionPage.css';

export class TransactionPage extends Component {
    constructor() {
        super();
        this.state = ({value: 0, isPositive: false, name: "Transaction", spontaneous: true});
    }

    setPositive = () => {
        this.setState({positive: true})
    }

    setNegative = () => {
        this.setState({positive: false})
    }

    render() {
        return (
            <div id="page">
                <div id="header">
                    ∇
                    <br/>
                    ${this.state.name}
                </div>
                <div className="input-group" id="transaction">
                    <form>
                        <button type="button" className="btn btn-success" onClick ={this.setPositive}>+</button>
                        <button type="button" className="btn btn-danger" onClick={this.setNegative}>-</button>

                        <span className="input-group-text" id="money" defaultValue="0" type="number">$</span>
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
                                checked={this.state.spontaneous}/>
                            Spontaneous
                        </label>

                        <label className="btn btn-primary">
                            <input
                                type="radio"
                                name="repeated"
                                id="regular"
                                autoComplete="off"
                                checked={!this.state.spontaneous}/>
                            Regular
                        </label>
                    </div>
                </div>

                <button type="button" className="btn btn-primary">
                    Confirm
                </button>
            </div>
        );
    }
}