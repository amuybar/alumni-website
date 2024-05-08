import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SaccoPage.css';

const SaccoPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const history = useNavigate();

  useEffect(() => {
    if (!token) {
      history('/login');
    }
  }, [token, history]);

  return (
    <div className='sacco-page'>
      <div className='sacco-hero'><h1>Sacco Page</h1>
      <p>Welcome to the Stamms Alumni Sacco page. Our goal is to provide financial support and resources to our alumni members. Our mission is to empower our alumni to achieve their financial goals and build a strong community.</p></div>
      
    <div className='dashboard'> 
    <h2>Dashboard</h2>
     <button onClick={() => history('/join-sacco')}>Join Sacco</button>
      <button onClick={() => history('/transactions')}>Manage Transactions</button>
      <button onClick={() => history('/welfare')}>Welfare</button>
      <button onClick={() => history('/sacco-dashboard')}>Sacco Dashboard</button></div>
    </div>
  );
};

export default SaccoPage;