import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SaccoPage.css';
import useFetchUserData from '../../custom_hooks/useFetchHook';

const SaccoPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const history = useNavigate();
  const { user } = useFetchUserData();
 const isAdmin = user && user.isadmin;


  useEffect(() => {
    if (!token) {
      history('/login');
    }
  }, [token, history]);

  return (
    <div className='sacco-page'>
        
        {isAdmin ? (
            <div className='dashboard'>
                <h2>Dashboard for Admin</h2>
                <button onClick={() => history('/manage-loans')}>Manage Loans</button>
                <button onClick={() => history('/manage-savings')}>Savings</button>
                <button onClick={() => history('/manage-users')}>Account</button>
                <button onClick={() => history('/board')}>Board Members</button>
                <button onClick={() => history('/feedback')}>Q&A Section</button>
                <button onClick={() => history('/board')}>System Maintanance Issues</button>
            </div>
        ) : (
            <div className='dashboard'>
                <div className='sacco-hero'>
            <h1>Sacco Page</h1>
            <p>Welcome to the Stamms Alumni Sacco page. Our goal is to provide financial support and resources to our alumni members. Our mission is to empower our alumni to achieve their financial goals and build a strong community.</p>
            </div>
              
                <button onClick={() => history('/shares')}>Buy Shares</button>
                <button onClick={() => history('/sacco-profile')}>Loans</button>
                <button onClick={() => history('/sacco-account')}>Account</button>
                <button onClick={() => history('/board')}>Board Members</button>
                <button onClick={() => history('/faq-sacco')}>Sacco FAQ</button>
            </div>
        )}
    </div>
);
};

export default SaccoPage;