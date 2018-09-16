import React, { Component } from 'react';
import './IncomeOption.css';

export class IncomeOption extends Component{
    render() {
        return(
            <div className = "box">
                <span>
                    Employment Status:
                    <div class="dropdown show">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Status
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="#">Employed</a>
                            <a class="dropdown-item" href="#">Unemployed</a>
                            <a class="dropdown-item" href="#">Student</a>
                        </div>
                    </div>
                </span>

                <span>
                    <div class="form-group" id = "income">
                        <label for="comment">Income:</label>
                        <textarea class="form-control" rows="1" id="comment"></textarea>
                    </div>
                </span>

            </div>
        );
    }
}