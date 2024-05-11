import React, { useState } from 'react';
import './styles/Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl, userEndpoints } from '../../Services/apis_endpoin';


const RegisterForm = () => {
  const [name, setName] = useState('');const [idno, setIdno] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
const navigate=useNavigate();

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try{
      if (password!== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      const response = await axios.post(baseUrl + userEndpoints.signup, {
        name,
        idno,
        email,
        phone,
        password,

      });

      const token = response.data.token; // Get token from response
      localStorage.setItem('token', token); // Save token to localStorage

      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      setError(`Email or Phone Exist`);
    }

  };

  const handleNameChange = (event:any) => {
    setName(event.target.value);
  };
  const handleIDChange = (event:any) => {
    setIdno(event.target.value);
  };

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event:any) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event:any) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='registration-form'>
      {error && <h3 className='error-message'>{error}</h3>}

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={name}
        onChange={handleNameChange}
        required
      /> <label htmlFor="idno">ID no:</label>
      <input
        type="text"
        name="idno"
        value={idno}
        onChange={handleIDChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        required
      />

      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        name="phone"
        value={phone}
        onChange={handlePhoneChange}
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

      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        name="confirm-password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
      />

      <button type="submit">Register</button>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>

    </form>
  );
};

export default RegisterForm;