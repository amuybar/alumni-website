import React, { useState } from 'react';
import './styles/EeditProfile.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.put(
        'http://localhost:3002/api/user/update',
        {
          name,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle response data as needed
      setName('');
      setEmail('');
      setPhone('');
      setError('');
      navigate('/profile')
    } catch (error) {
      setError('An error occurred while updating the profile.');
      // Handle error
    }
  };
  

  const handleNameChange = (event:any) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event:any) => {
    setPhone(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='edit-profile-form '>
      <h2>Edit Your Profile</h2>
      {error && <p>{error}</p>}

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
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

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfile;