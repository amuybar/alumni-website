import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../../types';
import { baseUrl, userEndpoints } from '../../Services/apis_endpoin';
import '../styles/ManageSaccoPage.css';
import { AxiosError } from 'axios';

function ManageSaccoPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(baseUrl + userEndpoints.getAllUsers);
        setUsers(response.data.users);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleMakeAdmin = async (userId: string) => {
    try {
      const endpoint = userEndpoints.promoteAdmin;
      const url = `https://alumni-backend-l27c.onrender.com/api/user/promoteAdmin/${userId}`;
      const response = await axios.put(url);
      const updatedUser = response.data;

      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
    } catch (error) {
      console.error(error);
      setError('Failed to make user admin'); // Update error message
    }
  };

  return (
    <div className="manage-sacco-page">
      <h1>Manage Sacco Users</h1>
      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {users.length > 0 &&
            users
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((user) => {
                return (
                  <li key={user.id}>
                    {user.name} ({user.email})
                    {user.isadmin ? (
                      <span className="admin-status">Demote</span>
                    ) : (
                      <button onClick={() => handleMakeAdmin(user.id)}>Make Admin</button>
                    )}
                  </li>
                );
              })}
        </ul>
      )}
    </div>
  );
}

export default ManageSaccoPage;
