import React, { useState, useEffect } from 'react';
import './App.css';
import './saving.css';

import title from './assets/Title.jpg';
import icon from './assets/Icon.jpg';
import originLogo from './assets/logoOrigin.jpg';
import moment from 'moment';

function App() {
  // States for total amount, target date, and calculated monthly deposit
  const [amount, setAmount] = useState('');
  const [reachDate, setReachDate] = useState('');
  const [monthlyDeposit, setMonthlyDeposit] = useState(0);
  const [monthsLeft, setMonthsLeft] = useState(0);

  // Handle amount input change
  const handleAmountChange = (e) => {
    const input = e.target.value.replace(/,/g, '');
    if (!isNaN(input)) {
      setAmount(input);
    }
  };

  // Handle reach date input (month and year)
  const handleDateChange = (e) => {
    const targetDate = moment(e.target.value + "-01"); // format YYYY-MM
    if (targetDate.isValid() && targetDate.isAfter(moment())) {
      setReachDate(targetDate);
    }
  };

  // Calculate monthly deposit when the amount or reachDate changes
  useEffect(() => {
    if (amount && reachDate) {
      const totalAmount = parseFloat(amount);
      const months = reachDate.diff(moment(), 'months') + 1; // Include current month
      setMonthsLeft(months);
      if (months > 0) {
        const deposit = (totalAmount / months).toFixed(2);
        setMonthlyDeposit(deposit);
      }
    }
  }, [amount, reachDate]);

  return (
    <>
      <div className="nav">
        <img src={originLogo} alt="Origin Logo" />
      </div>
      
      <div className="title">
        <img src={title} alt="Title" />
      </div>

      <div className="container">
        <div className="card">
          <div className="icon">
            <img src={icon} alt="Goal Icon" />
            <div className="text">
              <h1>Buy a house</h1>
              <h4>Saving goal</h4>
            </div>
          </div>

          <div className="inputs">
            {/* Left: Amount input */}
            <div className="left">
              <h3>Total Amount</h3>
              <div className="total">
                <input
                  type="text"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
            </div>

            {/* Right: Date input */}
            <div className="right">
              <h5>Reach goal by</h5>
              <div className="date">
                <input
                  className="dateInput"
                  type="month" // Allows selection of month/year
                  value={reachDate ? reachDate.format("YYYY-MM") : ''}
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </div>

          {/* Monthly deposit display */}
          <div className="monthlyAmount">
            <div className="both">
              <div className="month">
                <h3>Monthly amount</h3>
              </div>
              <div className="amount">
                ${monthlyDeposit}
              </div>
            </div>
            
            {/* Details about goal */}
            <div className="details">
              {amount && reachDate && monthsLeft > 0 ? (
                <div className="break">
                  You’re planning {monthsLeft} monthly deposits to reach your ${amount} goal by {reachDate.format("MMMM YYYY")}.
                </div>
              ) : (
                <div className="break">
                  Please enter a valid amount and goal date to calculate your monthly deposit.
                </div>
              )}
            </div>
          </div>

          {/* Confirm Button */}
          <button className="btn">Confirm</button>
        </div>
      </div>
    </>
  );
}

export default App;
