import React, { useState, useEffect } from 'react';
import '../styles/SaccoProfile.css';
import axios from 'axios';
import { Transactions } from '../../types';
import { baseUrl, loanEndpoints, transactionsEndpoints, userEndpoints } from '../../Services/apis_endpoin';

const SaccoProfile = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [loanAmount, setLoanAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(baseUrl + transactionsEndpoints.getAllTransactions);
        setTransactions(response.data.transactions.filter((transaction: { type: string }) => transaction.type === 'loan'));
      } catch (error) {
        console.error(error);
      }
    };
  

    fetchTransactions();
  }, []);
  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return dateObject.toLocaleDateString('en-US', options);
  };

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
      <h2>Approved Loans</h2>
      <p>Appproved loans goes here</p>
      
      <h2>Loan Transactions</h2>
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
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default SaccoProfile;