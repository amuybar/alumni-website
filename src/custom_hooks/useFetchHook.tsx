import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, userEndpoints } from '../Services/apis_endpoin';
import { User } from '../types';

interface ApiResponse {
  user: User;
  loading: boolean;
}

const useFetchUserData = (): { user: User | null; loading: boolean } => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return null;
      }

      try {
        const response = await axios.get<ApiResponse>(baseUrl + userEndpoints.userProfile, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data.user;
        setUser(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Check if user data is fetched
    if (!user) {
      fetchUserData();
    }
  }, [user]); 

  return { user, loading };
};

export default useFetchUserData;
