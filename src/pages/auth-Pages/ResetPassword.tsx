import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ResetPassword.css';
import { baseUrl, userEndpoints } from '../../Services/apis_endpoin';


const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
   

    try {
      const response = await axios.post(baseUrl + userEndpoints.resetPassword, { email, password ,confirmPassword});
      setSuccessMessage(response.data.message);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (!error) {
        setErrorMessage('Something went wrong. Please try again later.');
      } else {
        setErrorMessage(`${error}`);
      }
    }
  };

  return (
    <div className="reset-password">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default ResetPassword;