import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import usenavigate hook
import './styles/Login.css';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/api/user/login', {
        email,
        password,
      });

      const token = response.data.token; // Get token from response
      localStorage.setItem('token', token); // Save token to localStorage

      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      setError(`Invalip Password or Email`);
    }
  };

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <h2>Login</h2>
      <h4 className='error-message'>{error}</h4>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />

      <button type="submit">Login</button>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
      <p>
        Forgot your password? <a href="/reset-password">Reset here</a>
      </p>
    </form>
  );
};

export default LoginForm;
