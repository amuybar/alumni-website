import React, { useState } from 'react';
import axios from 'axios';
import { Loan, User } from '../types'; // Assuming you have a User type defined
import { baseUrl, loanEndpoints } from '../Services/apis_endpoin';
import '../styles/LoanForm.css'

interface LoanApplicationFormProps {
  onLoanApply: (loan: Loan) => void;
  userId: string | User;
}

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ onLoanApply, userId }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount) {
      setError('Please enter the loan amount.');
      return;
    }
    if (!userId || (typeof userId === 'object' && !userId._id)) {
      setError('Invalid user ID.');
      return;
    }

    try {
      const response = await axios.post(baseUrl + loanEndpoints.createLoan, {
        amount,
        userId: typeof userId === 'object' ? userId._id : userId // Ensure userId is a string
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const newLoan: Loan = response.data;
      onLoanApply(newLoan);
      setAmount('');
      setError('');
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.message === 'User not found') {
          setError('User not found. Please try again.');
        } else if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Failed to apply for the loan.');
        }
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h3>Apply for a Loan</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Loan Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
