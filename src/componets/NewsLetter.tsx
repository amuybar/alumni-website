import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NewsLetter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your email');
      return;
    }
    try {
      const response = await axios.post('/api/newsletter', { email });
      setSuccessMessage(response.data.message);
      setEmail('');
    } catch (error) {
      if (!`${error}`) {
        setErrorMessage('Something went wrong. Please try again later.');
      } else {
        setErrorMessage(`${error}`);
      }
    }
  };

  return (
    <div className='newsletter'>
      <h2>Sign up for our newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Newsletter;