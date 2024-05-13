import axios from 'axios';
import { baseUrl, transactionsEndpoints } from '../../Services/apis_endpoin';
import { Transactions } from '../../types';
import { useState, useEffect } from 'react';
import '../styles/LoansPage.css'; 

const LoanLimitTab = () => {
  return (
    <div>
      <div className="loan-limit">
        <h3>Loan Limit: 0.00</h3>
         <button>Review Limit</button>
      </div>
    </div>
  );
};

const ApplyLoanTab = ({
  handleApplyForLoan,
  errorMessage,
  successMessage,
}: {
  handleApplyForLoan: (e: React.FormEvent<HTMLFormElement>) => void;
  errorMessage: string | null;
  successMessage: string | null;
}) => {
  const [localLoanAmount, setLocalLoanAmount] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleApplyForLoan(e);
  };

  return (
    <div className='applyloan-tab'>
      <h2>Apply for a Loan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="loanAmount"
          id="loanAmount"
          placeholder="Loan Amount"
          value={localLoanAmount}
          onChange={(e) => setLocalLoanAmount(e.target.value)}
        />
        <button type="submit">Apply</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};


const PayLoanTab = ({
  handlePayLoan,

}: {
  handlePayLoan: (e: React.FormEvent<HTMLFormElement>) => void;
  errorMessage: string | null;
  successMessage: string | null;
}) => {
  const [localLoanAmount, setLocalLoanAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePayLoan(e);
  };
  return (
    <div className='payloan-tab'>
      <h2>Loan Debt :0.00</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="loanAmount"
          id="loanAmount"
          placeholder="Loan Amount"
          value={localLoanAmount}
          onChange={(e) => setLocalLoanAmount(e.target.value)}
        />
        <button type="submit">Pay</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

    </div>
  )}



const TabSwitcher = ({ activeTabIndex, onTabChange }: { activeTabIndex: number; onTabChange: (index: number) => void }) => {
  const handleClick = (index: number) => {
    onTabChange(index);
  };

  return (
    <ul className="tab-switcher">
      <li className={activeTabIndex === 0 ? 'active' : ''} onClick={() => handleClick(0)}>
        Loan Limit
      </li>
      <li className={activeTabIndex === 1 ? 'active' : ''} onClick={() => handleClick(1)}>
        Apply Loan
      </li>
      <li className={activeTabIndex === 2 ? 'active' : ''} onClick={() => handleClick(2)}>
        Pay Loan
      </li>
    </ul>
  );
};

const LoansProfile = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
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

  const handleTabChange = (newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const handleApplyForLoan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loanAmountInput = e.currentTarget.querySelector('input[name="loanAmount"]') as HTMLInputElement;
    if (loanAmountInput) {
      setLoanAmount(loanAmountInput.value);
    }
  };
  const handlePayLoan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loanAmountInput = e.currentTarget.querySelector('input[name="loanAmount"]') as HTMLInputElement;
    if (loanAmountInput) {
      setLoanAmount(loanAmountInput.value);
    }
  };

  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return dateObject.toLocaleDateString('en-US', options);
  };

  return (
    <div className="loans-profile">
      <h1>Loans Profile</h1>

      <TabSwitcher activeTabIndex={tabIndex} onTabChange={handleTabChange} />

      <div className="tab-content">
        {tabIndex === 0 && <LoanLimitTab />}
        {tabIndex === 1 && (
          <ApplyLoanTab
            handleApplyForLoan={handleApplyForLoan}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        )}
        {tabIndex === 2 && <PayLoanTab
        handlePayLoan={handlePayLoan} 
        errorMessage={errorMessage}
        successMessage={successMessage}

        />}
      </div>

      <div className="pending-loans">
        <h2>Pending Loans</h2>
        <p>Pending loans will be displayed here</p>
      </div>

      <div className="approved-loans">
        <h2>Approved Loans</h2>
        <p>Approved loans go here</p>
      </div>

      <div className="loan-transactions">
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
    </div>
  );
};

export default LoansProfile;
