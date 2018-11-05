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
                    Transaction
                </div>
                <div className="input-group row justify-content-md-center row" id="transaction">
                    <form className="form-inline">
                        <span className="btn-group btn-group-toggle col col-3" data-toggle="buttons" id="sign">
                            <label className="btn btn-success active">
                                <input
                                    type="radio"
                                    name="positive"
                                    id="positive"
                                    autoComplete="off"
                                    checked={this.state.positive}/>
                                +
                            </label>

                            <label className="btn btn-danger">
                                <input
                                    type="radio"
                                    name="negative"
                                    id="negative"
                                    autoComplete="off"
                                    checked={!this.state.positive}/>
                                -
                            </label>
                        </span>
                        <span className="input-group col col-9" id="money">
                            <span className="input-group-prepend">
                                <span className="input-group-text">$</span>
                            </span>
                            <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)">
                            </input>
                        </span>
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