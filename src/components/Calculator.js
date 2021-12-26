import React from "react";
import NumberFormat from 'react-number-format';
import Warning from './Warning'

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            purchasePrice: 0,
            downPayment: 0,
            repaymentTime: 0,
            interestRate: 0,
            loanAmount: 0,
            prMonth: 0,
            error: ''
        }
    }

    handlePurchasePriceChange = (e) => {
        this.setState({purchasePrice: e.target.value})
    }
    handleDownPaymentChange = (e) => {
        this.setState({downPayment: e.target.value})
    }
    handleRepaymentTimeChange = (e) => {
        this.setState({repaymentTime: e.target.value})
    }
    handleInterestRateChange = (e) => {
        this.setState({interestRate: e.target.value})
    }

    handleClick = (e) => {
        e.preventDefault();
        //extract values from state for easier calculation
        let purchasePrice = this.state.purchasePrice
        let downPayment = this.state.downPayment
        let interestRate = this.state.interestRate === 0 ? 0 : this.state.interestRate/100
	    let numberOfMonthlyPayments = this.state.repaymentTime * 12;

        if (!purchasePrice || !downPayment || !interestRate || !numberOfMonthlyPayments) {
            this.setState({
                error: 'Please input all parameters'
            })
            return
        } else {
            this.setState({
                error: ''
            })
        }

        //Calculate principal = purchase price - down payment
        let principal = purchasePrice - downPayment;

        //Calculate monthly interest rate by dividing annual rate by 12
	    let monthlyInterestRate = interestRate === 0 ? 0 : interestRate/12;

        //Apply the mortgage calculation formula and rounding it to 3 decimals
	    let M = (((monthlyInterestRate * principal * (Math.pow((1+monthlyInterestRate), numberOfMonthlyPayments)))) / ((Math.pow((1+monthlyInterestRate), numberOfMonthlyPayments)) - 1));
        M = Math.round(M*1000)/1000
        M = M * 1000;
        if (isNaN(M)) { 
            M = 0; 
        }
        //Done calculation
        this.setState({
            loanAmount: principal,
            prMonth: M
        })
    }

    render() {
        return (
            <div className="bg-indigo-600 rounded-3xl p-12 border-8 border-white">
                <div className="mb-8">
                    <h1 className="text-3xl">Mortgage Calculator</h1>
                </div>
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">
                                <span>
                                    Purchase Price:&ensp;
                                </span>
                                <NumberFormat 
                                    thousandsGroupStyle="thousand"
                                    value={this.state.purchasePrice}
                                    prefix="$"
                                    suffix=",000"
                                    decimalSeparator="."
                                    displayType="text"
                                    type="text"
                                    thousandSeparator={true}
                                />
                            </span>
                        </label> 
                        <input type="range" min="0" max="1000" value={this.state.purchasePrice} onChange={this.handlePurchasePriceChange} className="range range-primary"/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">
                                <span>
                                    Down Payment:&ensp;
                                </span>
                                <NumberFormat 
                                    thousandsGroupStyle="thousand"
                                    value={this.state.downPayment}
                                    prefix="$"
                                    suffix=",000"
                                    decimalSeparator="."
                                    displayType="text"
                                    type="text"
                                    thousandSeparator={true}
                                />
                            </span>
                        </label> 
                        <input type="range" min="0" max="1000" value={this.state.downPayment} onChange={this.handleDownPaymentChange} className="range range-primary"/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">
                                <span>
                                    Repayment Time:&ensp;
                                </span>
                                <NumberFormat 
                                    thousandsGroupStyle="thousand"
                                    value={this.state.repaymentTime}
                                    prefix=""
                                    suffix=" years"
                                    decimalSeparator="."
                                    displayType="text"
                                    type="text"
                                    thousandSeparator={true}
                                />
                            </span>
                        </label> 
                        <input type="range" min="0" max="100" value={this.state.repaymentTime} onChange={this.handleRepaymentTimeChange} className="range range-primary"/>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">
                                <span>
                                    Interest Rate:&ensp;
                                </span>
                                <NumberFormat 
                                    thousandsGroupStyle="thousand"
                                    value={this.state.interestRate}
                                    prefix=""
                                    suffix="%"
                                    decimalSeparator="."
                                    displayType="text"
                                    type="text"
                                    thousandSeparator={true}
                                />
                            </span>
                        </label> 
                        <input type="range" min="0" max="100" step="0.25" value={this.state.interestRate} onChange={this.handleInterestRateChange} className="range range-primary"/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Loan amount: </span>
                        </label>
                        <h2 className="text-xl">
                            <NumberFormat 
                                thousandsGroupStyle="thousand"
                                value={this.state.loanAmount}
                                prefix="$"
                                suffix=",000"
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                            />
                        </h2>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Estimate pr.month: </span>
                        </label>
                        <h2 className="text-xl">
                            <NumberFormat 
                                thousandsGroupStyle="thousand"
                                value={this.state.prMonth}
                                prefix="$"
                                suffix=""
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                            />
                        </h2>
                    </div>
                </div>
                
                { this.state.error &&
                    <Warning warn={this.state.error}/>
                }
                <div className="grid grid-cols-3 mt-6 pt-3">
                    <div className="col-span-1">
                        <button className="btn btn-primary mortgage-btn" onClick={this.handleClick}>Get a mortgage quote</button>
                    </div>
                </div>
            </div>
        );
    }
}
