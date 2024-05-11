import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagingSavings = () => {
  const [totalSavings, setTotalSavings] = useState(0);
  const [userSavings, setUserSavings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavingsData = async () => {
      try {
        const response = await axios.get('/api/savings');
        const data = response.data;
        setTotalSavings(data.totalSavings);
        setUserSavings(data.userSavings);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavingsData();
  }, []);

  return (
    <div>
      <h1>Total Savings: KES {totalSavings.toLocaleString()}</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Savings</th>
            <th>Savings Pattern</th>
          </tr>
        </thead>
        <tbody>
          {userSavings.map((userSavings, index) => (
            <tr key={index}>
              <td>{userSavings.username}</td>
              <td>KES {userSavings.savings.toLocaleString()}</td>
              <td>{userSavings.savingsPattern}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagingSavings;