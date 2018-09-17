import React, { Component } from 'react';
import './IncomeOption.css';

export class IncomeOption extends Component{
    constructor(props){
        super(props);

        this.state = {
            employmentStatus: "", 
            incomeValue: 0, 
            inputColor: 'red'
        }

        this.updateEmploymentStatus = this.updateEmploymentStatus.bind(this);
        this.setIncomeValue = this.setIncomeValue.bind(this);
    }

    updateEmploymentStatus(evt){
        this.setState({
            employmentStatus: evt.target.value
        });
    }

    setIncomeValue(evt){
        if(evt.key === 'Enter'){
            this.setState({
                incomeValue: evt.target.value, 
                inputColor: 'green'
            });

        }
    }

    


    
    render() {
        return(
            <div className = "box">
                <span>
                    <div onChange = {this.updateEmploymentStatus} className="form-group" id = "income">
                        <label for="exampleFormControlSelect1">Employment Status: </label>
                        <span id = "colorEmpStatus">{this.state.employmentStatus}</span>
                        <select className="form-control" id="exampleFormControlSelect1">
                        <option>Employed</option>
                        <option>Unemployed</option>
                        <option>Student</option>
                        </select>
                    </div>
                </span>

                <span>
                    <div onKeyPress = {this.setIncomeValue} className="form-group" id = "income">
                        <label for="comment">Income:</label>
                        <span style={{color: this.state.inputColor}}>{this.state.incomeValue}</span>
                        <input type = "number" className="form-control" rows="1" id="comment"></input>
                    </div>
                </span>

            </div>
        );
    }
}