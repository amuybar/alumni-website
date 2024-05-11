import React, { useState, useEffect } from 'react';
import '../styles/SaccoProfile.css';
import axios from 'axios';
import { Transactions } from '../../types';
import { baseUrl, loanEndpoints, userEndpoints } from '../../Services/apis_endpoin';

const SaccoProfile = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [loanAmount, setLoanAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(baseUrl + userEndpoints.updateUser,);
        setTransactions(response.data.transactions);
      } catch (error) {
        if (!error) {
          setErrorMessage('Something went wrong. Please try again later.');
        } else {
          setErrorMessage(`${error}`);
        }
      }
    };

    fetchTransactions();
  }, []);

  const handleApplyForLoan = async (e:any) => {
    e.preventDefault();
    if (!loanAmount) {
      setErrorMessage('Please enter a loan amount');
      return;
    }
    try {
      const response = await axios.post(baseUrl + loanEndpoints.createLoan, { loanAmount });
      setSuccessMessage(response.data.message);
      setLoanAmount('');
    } catch (error) {
      if (!error) {
        setErrorMessage('Something went wrong. Please try again later.');
      } else {
        setErrorMessage(`${error}`);
      }
    }
  };

  return (
    <div className="sacco-profile">
      <h1>Sacco Profile</h1>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Apply for a Loan</h2>
      <form onSubmit={handleApplyForLoan}>
        <input
          type="number"
          placeholder="Loan Amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <button type="submit">Apply</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <h2>Pending Loans</h2>
      <p>Pending loans will be displayed here</p>
      <h2>Savings</h2>
      <p>Your savings balance will be displayed here</p>
    </div>
  );
};

export default SaccoProfile;