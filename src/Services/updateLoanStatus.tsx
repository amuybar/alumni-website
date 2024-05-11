import axios from 'axios';
import { baseUrl, loanEndpoints } from './apis_endpoin';

export  const updateLoanStatus = async (id: string, value: string) => {
  try {
    const url = `${baseUrl}${loanEndpoints.updateLoan(id)}`;
    await axios.put(url, { id, status: value });
    console.log('Loan status updated successfully');
  } catch (error) {
    console.error('Failed to update loan status:', error);
  }
};

