import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import axios from 'axios';
import '../../styles/Profilepage.css'
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No token found.');
        }
    
        const response = await axios.get('http://localhost:3002/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setActivities(response.data.activities);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };
    

    fetchUserAndActivities();
  }, [navigate]);

  const onLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="profile-page">
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
          <button onClick={onLogout}>Logout</button>
          <button>Sacco</button>
          <button>Forums</button>
          <h2>Activities</h2>
          {/* <ul>
            {activities.map((activity) => (
              <li key={activity.id}>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </li>
            ))}
          </ul> */}
        </>
      ) : (
        <>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
