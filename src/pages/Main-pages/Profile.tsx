import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import axios from 'axios';
import '../../styles/Profilepage.css'
import { useNavigate } from 'react-router-dom';
import { baseUrl, userEndpoints } from '../../Services/apis_endpoin';

const ProfilePage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoaned,setIsLoaned]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No token found.');
        }
    
        const response = await axios.get(baseUrl + userEndpoints.userProfile, {
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
        {user.isadmin==true?
        <h3>Admin</h3>:
        <h3>User</h3>
         }
         
          <div className='profile-pic'>
            <h1>{user.name[0]}</h1>
          </div>
          <h1> {user.name}!</h1>
          <p>Email: {user.email}</p>
          <div className='cta-s'>
          <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
          <button onClick={onLogout}>Logout</button>
          </div>
          <div className='container'>
          <div className='account-container'>
          <p>Account Balance:{user.phone}</p>
          <button >Deposit</button>
          </div>
          <div className='social-container'>
          <p>Social Fund :{user.phone}</p>
          <button >Deposit</button>
          </div>
          <div className='loan-container'>
          <p>Loan Debt: {user.idno}</p>
          {
            isLoaned?(
              <button>Pay Loan</button>
            ):(
              <button>Loan</button>
            )
          }
          </div>
          <div className='shares-container'>
          <p>Total Shares :{user.phone}</p>
          <button >Buy Shares</button>
          </div>
          
          </div>
          <div className='links-container'>
            <h3>Links</h3>
            <button onClick={() => navigate('/sacco')}>Sacco</button>
          <button onClick={() => navigate('/event')}>Events</button>
          </div>
          
        </>
      ) : (
        <>
        <div className='auth-Page'>
          <h1>Welcome to Stamms Alumni Sacco</h1>
          <p>Please login to continue</p>
          
          <div className='other-buttons'>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
