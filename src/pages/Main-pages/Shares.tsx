import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, shareEndpoints, transactionsEndpoints } from '../../Services/apis_endpoin';
import '../../styles/SharesPage.css';
import { Share, Transactions, User } from '../../types';
import { Alert } from '@mui/material';
import useFetchUserData from '../../custom_hooks/useFetchHook';

const SharesPage = () => {
  // State variables
  const [shares, setShares] = useState<Share[]>([]);
  const [currentShares, setCurrentShares] = useState<Share[]>([]);
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [buyingShare, setBuyingShare] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [totalShares, setTotalShares] = useState<number>(0);
  const [totalShareValue, setTotalShareValue] = useState<number>(0);
  const token = localStorage.getItem('token');
  const { user } = useFetchUserData();

  // Fetch data on component mount
  useEffect(() => {
    fetchShares();
    fetchCurrentShares();
    fetchTransactions();
  }, []);

  // Fetch all shares from API
  const fetchShares = async () => {
    try {
      const userId = getLoggedInUserId();
      const response = await axios.get(baseUrl + shareEndpoints.fetchShares);
      setShares(response.data.shares);
    } catch (error) {
      console.error(error);
    }
  };

  // Get logged-in user's ID
  const getLoggedInUserId = () => {
    if (user) {
      return user._id;
    }
  };

  // Fetch shares owned by the logged-in user
  const fetchCurrentShares = async () => {
    try {
      const response = await axios.get(baseUrl + shareEndpoints.getSharesByUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentShares(response.data.shares);
      setTotalShares(response.data.totalShares);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(baseUrl + transactionsEndpoints.getAllTransactions);
      setTransactions(response.data.transactions.filter((transaction: { type: string }) => transaction.type === 'share'));
    } catch (error) {
      console.error(error);
    }
  };

  // Update total shares count and value
  useEffect(() => {
    let totalSharesCount = 0;
    let totalValue = 0;
    currentShares.forEach((share) => {
      totalSharesCount += share.totalQuantity;
      totalValue += share.totalQuantity * share.currentPrice;
    });
    setTotalShares(totalSharesCount);
    setTotalShareValue(totalValue);
  }, [currentShares]);

  // Handle buying shares
  const handleBuyShare = async (e: any) => {
    e.preventDefault();
    try {
      if (!user) {
        console.error('User details not available.');
        return;
      }

      const shareToBuy = buyingShare;
      const quantityValue = quantity;

      if (!shareToBuy || isNaN(quantityValue) || quantityValue <= 0) {
        alert('Please select a share and enter a valid quantity (positive number).');
        return;
      }

      const requestBody = {
        shareId: shares.find((share) => share.name === shareToBuy)?._id,
        userId: user.id,
        quantity: quantityValue,
      };

      const response = await axios.post(baseUrl + shareEndpoints.buyShare, requestBody);

      if (response.data.success) {
        console.log('Share bought successfully!');
      } else {
        console.error('Error buying share:', response.data.error);
        alert(`Error buying share: ${response.data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while buying the share. Please try again later.');
    }
  };

  // Format date
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
    <div className="shares-page">
      {/* Section for current shares */}
      <section className="current-shares">
        <h2>Current Shares</h2>
        <p>Total Shares: {totalShares}</p>
        <p>Total Share Value: ${totalShareValue.toFixed(2)}</p>
      </section>

      {/* Section for available shares */}
      <section className="shares-table">
        <h2>Available Shares</h2>
        <table>
          <thead>
            <tr>
              <th>Share Name</th>
              <th>Current Price</th>
            </tr>
          </thead>
          <tbody>
            {shares.map((share, index) => (
              <tr key={index}>
                <td>{share.name}</td>
                <td>{share.currentPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Section for buying shares */}
      <section className="buy-share">
        <h2>Buy Shares</h2>
        <form onSubmit={handleBuyShare}>
          <label htmlFor="share">Select a share:</label>
          <select id="share" value={buyingShare} onChange={(e) => setBuyingShare(e.target.value)}>
            <option value="">Select a share</option>
            {shares.map((share, index) => (
              <option key={index} value={share.name}>
                {share.name}
              </option>
            ))}
          </select>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
          <button type="submit">Buy</button>
        </form>
      </section>

      {/* Section for displaying transactions */}
      <section className="transactions">
        <h2>Transactions</h2>
        <Alert severity="info">
          <strong>Note: </strong>
          <p>Transactions are shown in the order they were made.</p>
        </Alert>
        <ul>
          {transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              {user && user._id === transaction.userId && (
                <li>
                  <h3>{formatDate(transaction.date)}</h3>
                  <p>Description: {transaction.description}</p>
                  <p>Amount: {transaction.amount}</p>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SharesPage;
