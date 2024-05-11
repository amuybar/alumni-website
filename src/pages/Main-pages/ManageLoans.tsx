import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Loan } from '../../types';
import { baseUrl, loanEndpoints, userEndpoints } from '../../Services/apis_endpoin';
import useFetchUserData from '../../custom_hooks/useFetchHook';
import LoanApplicationForm from '../../componets/LoanApplicationForm';
import '../styles/ManageLoans.css';
import { updateLoanStatus } from '../../Services/updateLoanStatus';

const ManageLoans: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useFetchUserData();
  const userId = user && typeof user === 'object' && user._id ? user._id : '';
  const isAdmin = user && user.isadmin;

  useEffect(() => {
    const fetchLoans = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(baseUrl + loanEndpoints.getAllLoans);
        setLoans(response.data.loans);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMessage('Something went wrong. Please try again later.');
        setIsLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(baseUrl + userEndpoints.getAllUsers);
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLoans();
    fetchUsers();
  }, []);

  const findUserNameById = (userId: string): string => {
    const user = users.find((user: any) => user._id === userId);
    return user ? user.name : 'Unknown';
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  // const updateLoanStatus = async (id: string, value: string) => {
  //   try {
  //     await axios.put(baseUrl + loanEndpoints.updateLoan + id, { status: value });
  //     console.log('Loan status updated successfully');
  //   } catch (error) {
  //     console.error('Failed to update loan status:', error);
  //   }
  // };

  function handleLoanApplication(loan: Loan): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='loan-page'>
      <h2>Loan Management</h2>
      {!isAdmin?( <LoanApplicationForm onLoanApply={handleLoanApplication} userId={userId}/>):(
        <h2></h2>
      ) }

      <p>{errorMessage}</p>
      <h3>{isAdmin ? 'Existing Loans' : 'Your Loans'}</h3>
      {isLoading ? (
        <div className='loading'>
          <div className='spinner'></div>
          <p>Loading...</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              {isAdmin && <th>UserName</th>}
              <th>Amount</th>
              {isAdmin && (
                <>
                  <th>Status</th>
                  <th>Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>{formatDateString(loan.date)}</td>
                {isAdmin && <td>{findUserNameById(loan.user)}</td>}
                <td>${loan.amount}</td>
                {isAdmin && (
                  <>
                    <td>{loan.status}</td>
                    <td>
                      {loan.status === 'pending' && (
                        <select onChange={(e) => updateLoanStatus(loan._id, e.target.value)}>
                          <option value="pending">Pending</option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                        </select>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageLoans;
