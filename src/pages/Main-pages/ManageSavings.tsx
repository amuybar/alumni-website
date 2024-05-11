import React, { useState, useEffect } from 'eact';
import axios from 'axios';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from 'react';

interface UserSavings {
  username: string;
  savings: number;
  savingsPattern: string;
}

const ManagingSavings = () => {
  const [totalSavings, setTotalSavings] = useState(0);
  const [userSavings, setUserSavings] = useState<UserSavings[]>([]);
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
          {userSavings.map((userSavings: { username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; savings: { toLocaleString: () => string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }; savingsPattern: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
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